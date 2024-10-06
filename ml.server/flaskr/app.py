import json

import pandas as pd
from flask import Flask
from flask_cors import CORS
from predict import predict

app = Flask(__name__)
cors = CORS(app)


@app.route("/api/predict", methods=["GET"])
def index():
    """Home page."""
    df = pd.read_csv("/ml.server/flaskr/datasets/dataset-1.csv")
    data = df.head(400)
    prediction = predict(
        data,
        "/ml.server/flaskr/weights/scaler.save",
        "/ml.server/flaskr/weights/lstm_model.pth",
    )
    return json.dumps(prediction.values.tolist())


@app.route("/api/market-data", methods=["GET"])
def market_data():
    """Home page."""
    df = pd.read_csv("/ml.server/flaskr/datasets/dataset-1.csv")
    df = df.drop(columns=["Extra Feature"])
    json_data = df.to_json(orient="records")
    return json_data


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
