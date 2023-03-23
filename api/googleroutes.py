# Google routes call will go into this file

from flask import Flask, request, jsonify
import requests
from datetime import datetime, timedelta, timezone
from dotenv import find_dotenv, load_dotenv
import googlemaps
import os

# Load API Key
load_dotenv()
api_key = os.getenv('REACT_APP_MAPS_API_KEY')

# INPUT PARAMETERS
# Need to pass in parameters for route API:
# Origin, required
# Destination, required
# Mode, optional (trasit: DEFAULT?, driving, walking, cycling)
# arrival_time, optional (This will be useful for scheduling routes)
#   Note: if no departure_time or arrival_time is specified
#   departure_time defaults to now

def get_route(params):
    mode = '&mode=' + 'transit'
    key = '&key=' + api_key
    origin = 'origin=' + params.origin
    destination = '&destination=' + params.destination

    base_url = "https://maps.googleapis.com/maps/api/directions/json?origin=Norcross&destination=Atlanta"+mode+key

    payload = {}
    headers = {}

    response = requests.request("GET", base_url, headers=headers, data=payload)

    return response.text

# OUTPUT JSON
# The route information will be received as a JSON
# Take some time to explore the structure of a route JSON
# Here are some of the most important values:
# response['routes']['legs']['steps']
#   Legs are total stats of a route, plus steps
#   Steps are the individual actions taken during a route
#       Steps include: distance, duration, end_location,
#       start_location, html_instructions, polyline, travel_mode
#   (We'll need to render these values in our step-by-step output)