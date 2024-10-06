import datetime

import joblib
import numpy as np
import pandas as pd
import torch
from sklearn.preprocessing import MinMaxScaler
from torch import nn


class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size, num_layers=2):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(
            input_size, hidden_size, num_layers=num_layers, batch_first=True
        )
        self.fc1 = nn.Linear(hidden_size, 64)  # First fully connected layer
        self.fc2 = nn.Linear(64, output_size)  # Second fully connected layer
        self.relu = nn.ReLU()  # Activation function

    def forward(self, x):
        out, _ = self.lstm(x)
        out = out[:, -1, :]  # Get the last time step
        out = self.fc1(out)
        out = self.relu(out)
        out = self.fc2(out)
        return out


def predict(input_data, scaler_save_path, model_save_path):
    columns = [
        "Month",
        "Mug Sales",
        "Mud Pot Sales",
        "Saree Sales",
        "Wooden Spoon Sales",
        "Ceramic Plate Sales",
        "Handmade Basket Sales",
        "Leather Bag Sales",
        "Knitted Scarf Sales",
        "Glass Art Sales",
        "Handcrafted Candle Sales",
        "Extra Feature",  # Extra feature to be excluded
    ]

    # Split each string by comma and create a list of lists
    # parsed_data = [line.split(",") for line in input_data]

    # Create DataFrame
    df_input = input_data

    # Convert numerical columns to float
    for col in columns[1:]:
        df_input[col] = df_input[col].astype(float)

    # print("Parsed Input DataFrame:")
    # print(df_input)
    #
    # Drop the 'Extra Feature' column
    df_input = df_input.drop(columns=["Extra Feature"])

    # print("\nDataFrame after dropping 'Extra Feature':")
    # print(df_input)

    # Load the scaler
    try:
        scaler = joblib.load(scaler_save_path)
    except FileNotFoundError:
        raise FileNotFoundError(
            f"Scaler file not found at '{scaler_save_path}'. Please ensure you have saved the scaler during training."
        )

    # Drop the 'Month' column for scaling
    df_input_features = df_input.drop(columns=["Month"])

    # Normalize the data
    scaled_input = scaler.transform(df_input_features)

    # print("\nScaled Input Data:")
    # print(scaled_input)

    # Convert scaled input to tensor and add batch dimension
    input_tensor = torch.FloatTensor(scaled_input).unsqueeze(0)  # Shape: (1, 3, 10)

    # print("\nInput Tensor Shape:", input_tensor.shape)
    # Model parameters (ensure these match your trained model)
    input_size = scaled_input.shape[1]  # 10 features
    hidden_size = 64
    output_size = scaled_input.shape[1]  # Predicting 10 features
    num_layers = 2

    # Initialize the model
    model = LSTMModel(input_size, hidden_size, output_size, num_layers)

    # Load the trained model weights
    try:
        model.load_state_dict(torch.load(model_save_path, map_location="cpu"))
    except FileNotFoundError:
        raise FileNotFoundError(
            f"Model file not found at '{model_save_path}'. Please ensure you have trained and saved the model."
        )

    # Set the model to evaluation mode
    model.eval()

    # print("\nModel loaded and set to evaluation mode.")

    # Ensure the model and input are on CPU
    device = torch.device("cpu")
    model.to(device)
    input_tensor = input_tensor.to(device)

    # Make prediction
    with torch.no_grad():
        prediction = model(input_tensor)  # Shape: (1, 10)

    # print("\nRaw Prediction Tensor:")
    # print(prediction.cpu().numpy())
    # Convert prediction to numpy array
    prediction_np = prediction.cpu().numpy()

    # Create a placeholder array with zeros for inverse transformation
    placeholder = np.zeros((prediction_np.shape[0], scaler.n_features_in_))

    # Assign the predicted values to the appropriate columns
    placeholder[:, :output_size] = prediction_np

    # Inverse transform to get actual sales values
    inversed_predictions = scaler.inverse_transform(placeholder)

    # Extract only the sales predictions
    sales_predictions = inversed_predictions[:, :output_size]
    for index, value in enumerate(sales_predictions[0]):
        if value < 0:
            sales_predictions[0][index] = 1000 + value
        if value > 800 and value < 1000:
            sales_predictions[0][index] = 1000 - value
        elif value > 1000:
            sales_predictions[0][index] = value - 1000
    predicted_sales_df = pd.DataFrame(sales_predictions)

    # Determine the next month after the latest input month
    latest_month_str = df_input["Month"].max()
    latest_month = pd.to_datetime(latest_month_str)
    next_month = latest_month + pd.DateOffset(months=1)
    predicted_sales_df.index = [next_month]
    next_month = f"{datetime.datetime.strftime(next_month, '%Y-%m')}"

    # Create a DataFrame for better readability
    predicted_sales_df = pd.DataFrame(
        sales_predictions, columns=df_input_features.columns
    )

    # Determine the next month after the latest input month
    latest_month_str = df_input["Month"].max()
    latest_month = pd.to_datetime(latest_month_str)
    next_month = latest_month + pd.DateOffset(months=1)
    next_month = f"{datetime.datetime.strftime(next_month, '%Y-%m')}"
    # print(next_month)
    predicted_sales_df["Month"] = next_month
    predicted_sales_df["Extra Feature"] = np.random.randint(
        0, 100, len(predicted_sales_df)
    )
    # Create DataFrame
    df = pd.read_csv("./datasets/dataset-1.csv")
    df = df._append(predicted_sales_df)
    df = df.round(1)
    df = df.sort_values(by="Month", ascending=False)
    df.to_csv("./datasets/dataset-1.csv", index=False)
    return predicted_sales_df
