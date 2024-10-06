import json

import pandas as pd
from flask import Flask, request, send_file
from predict import predict

app = Flask(__name__)


@app.route("/api/predict", methods=["GET"])
def index():
    """Home page."""
    df = pd.read_csv("./datasets/dataset-1.csv")
    data = df.head(400)
    prediction = predict(data, "./weights/scaler.save", "./weights/lstm_model.pth")
    return json.dumps(prediction.values.tolist())


@app.route("/api/market-data", methods=["GET"])
def market_data():
    """Home page."""
    return send_file("./datasets/dataset-1.csv")


if __name__ == "__main__":
    app.run(debug=True)
