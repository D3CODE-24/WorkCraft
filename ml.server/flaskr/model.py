import numpy as np
import pandas as pd
import torch
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from torch import nn

# Sample data
# data = {
#     "Month": ["2021-01", "2021-02", "2021-03", "2021-04", "2021-05"],
#     "Mug Sales": [150, 160, 170, 180, 190],
#     "Mud Pot Sales": [80, 85, 90, 95, 100],
#     "Saree Sales": [200, 210, 220, 230, 240],
#     "Wooden Spoon Sales": [50, 60, 70, 80, 90],
#     "Ceramic Plate Sales": [100, 110, 120, 130, 140],
#     "Handmade Basket Sales": [70, 75, 80, 85, 90],
#     "Leather Bag Sales": [90, 95, 100, 105, 110],
#     "Knitted Scarf Sales": [40, 45, 50, 55, 60],
#     "Glass Art Sales": [30, 35, 40, 45, 50],
#     "Handcrafted Candle Sales": [60, 65, 70, 75, 80],
# }
if __name__ == "__main__":
    data = pd.read_csv("./datasets/dataset-1.csv")
    # Convert to DataFrame
    df = pd.DataFrame(data)
    df["Month"] = pd.to_datetime(df["Month"])
    df.set_index("Month", inplace=True)

    # Normalize the data
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(df)

    # Convert to tensor
    data_tensor = torch.FloatTensor(scaled_data)

    # Create sequences
    def create_sequences(data, seq_length):
        xs, ys = [], []
        for i in range(len(data) - seq_length):
            x = data[i : i + seq_length]
            y = data[i + seq_length]
            xs.append(x)
            ys.append(y)
        return torch.stack(xs), torch.stack(ys)

    # Parameters
    seq_length = 3
    X, y = create_sequences(data_tensor, seq_length)
    # Split into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )


# Define the LSTM model
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
        out = self.fc1(out)  # Pass through the first FC layer
        out = self.relu(out)  # Apply activation
        out = self.fc2(out)  # Pass through the second FC layer
        return out


if __name__ == "__main__":
    # Model parameters
    input_size = X.shape[2]  # Number of features
    hidden_size = 64
    output_size = y.shape[1]  # Number of sales categories

    # Initialize the model
    # device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    device = torch.device("cpu")
    model = LSTMModel(input_size, hidden_size, output_size).to(device)

    # Loss and optimizer
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-6)

    # Training loop
    num_epochs = 100000
    for epoch in range(num_epochs):
        model.train()

        # Move data to the GPU if available
        X_train_batch = X_train.to(device)
        y_train_batch = y_train.to(device)

        # Forward pass
        outputs = model(X_train_batch)
        loss = criterion(outputs, y_train_batch)

        # Backward and optimize
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if (epoch + 1) % 10 == 0:
            print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}")

    # Save the model weights and biases
    model_save_path = "lstm_model.pth"
    torch.save(model.state_dict(), model_save_path)
    print(f"Model weights and biases saved to {model_save_path}")

    # Load the model weights
    loaded_model = LSTMModel(input_size, hidden_size, output_size).to(device)
    loaded_model.load_state_dict(torch.load(model_save_path))
    loaded_model.eval()  # Set the model to evaluation mode

    # Evaluate the loaded model
    with torch.no_grad():
        X_test_batch = X_test.to(device)
        y_test_batch = y_test.to(device)

        predictions = loaded_model(X_test_batch)
        test_loss = criterion(predictions, y_test_batch)
        print(f"Test Loss: {test_loss.item():.4f}")

        # Inverse transform the predictions to get actual sales values
        predictions = scaler.inverse_transform(predictions.cpu().numpy())
