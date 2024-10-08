FROM python:3.11
COPY ./flaskr ./flaskr
WORKDIR /flaskr
ENV FLASK_DEBUG=1
ENV FLASK_APP="flaskr"
# Build the application
RUN pip install torch flask flask_cors numpy pandas scikit-learn
# RUN source ./venv/bin/activate

EXPOSE 5000

