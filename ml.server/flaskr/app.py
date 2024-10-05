import json

from flask import Flask, request
from predict import predict

app = Flask(__name__)


@app.route("/", methods=["POST"])
def index():
    """Home page."""
    data = request.json["data"]
    prediction = predict(data, "./weights/scaler.save", "./weights/lstm_model.pth")
    for i in range(1, len(prediction)):
        prediction[i] = f"{int(prediction[i])}"
    return json.dumps({"prediction": prediction})


if __name__ == "__main__":
    app.run(debug=True)
