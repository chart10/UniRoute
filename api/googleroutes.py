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

def get_route():
    mode = '&mode=' + 'transit'
    key = '&key=' + api_key
    # origin = 'origin=' + params.origin
    # destination = '&destination=' + params.destination

    # gmaps = googlemaps.Client(key=api_key)
    # directions_result = gmaps.directions('Athens,GA','Atlanta,GA', mode='transit')

    # response = jsonify(directions_result)
    # routes = response['routes']
    # for route in routes:
    #     route_bounds = route['bounds']
    #     route_bounds['south'] = route_bounds['southwest']['lat']
    #     route_bounds['west'] = route_bounds['southwest']['lng']
    #     route_bounds['north'] = route_bounds['northeast']['lat']
    #     route_bounds['east'] = route_bounds['northeast']['lng']

    # legs = route['legs']
    # for leg in legs:
    #     steps = leg['steps']
    #     for step in steps:
    #         points = step['polyline']['points']
    #         step['path'] = googlemaps.convert.decode_polyline(points)
    
    # return jsonify(directions_result)

    # return jsonify(directions_result)

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