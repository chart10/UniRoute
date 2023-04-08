# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

RUN apt-get update
RUN apt-get install -y gcc
RUN apt-get install -y default-libmysqlclient-dev
# This might make MySQL work :<

WORKDIR /python-docker

COPY api/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY api .
COPY .env .env

# RUN python -m venv venv
# RUN source venv/bin/activate

ENV FLASK_APP=api

CMD ["python", "-m" , "flask", "run", "--host=0.0.0.0"]

# To Build this docker image run this command: docker build -t api-test . 
# To run this image run this command: docker run -d -p 5000:5000 api-test 
# Use docker ps to check status
# Use docker kill to end the docker container