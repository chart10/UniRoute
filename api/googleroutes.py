# Google routes call will go into this file

from flask import Flask
import requests
from datetime import datetime, timedelta, timezone
from dotenv import find_dotenv, load_dotenv
import googlemaps
import os

# Load API Key
load_dotenv()
api_key = '&key=' + os.getenv('REACT_APP_MAPS_API_KEY')

# PARAMETERS
# Need to pass in parameters for route API:
# Origin, required
# Destination, required
# Mode, optional (trasit: DEFAULT?, driving, walking, cycling)
# arrival_time, optional (This will be useful for scheduling routes)
#   Note: if no departure_time or arrival_time is specified
#   departure_time defaults to now

mode = '&mode=' + 'transit'

base_url = "https://maps.googleapis.com/maps/api/directions/json?origin=Norcross&destination=Atlanta"+mode+api_key

payload={}
headers = {}

response = requests.request("GET", base_url, headers=headers, data=payload)

print(response.text)