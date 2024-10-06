FROM python:3.12
COPY ./ ./ml.server
WORKDIR /ml.server
ENV FLASK_DEBUG=1
ENV FLASK_APP="flaskr"
# Build the application
RUN pip install -r requirements.txt
RUN pip install flask_cors
# RUN source ./venv/bin/activate

EXPOSE 5000

