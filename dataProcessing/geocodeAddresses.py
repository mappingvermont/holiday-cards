import json
import geojson
import requests
import time
import os
import csv
from geopy import geocoders
from collections import defaultdict

baseDir = r'/home/charlie/Proj-15/holidayCards/dataProcessing'
inputCSV = os.path.join(baseDir, 'inputAddresses.csv')
outGeoJSON = os.path.join(baseDir, 'addresses.geojson')

featList = []

currentDir = os.getcwd()

g = geocoders.GoogleV3()

with open(inputCSV, 'rb') as theFile:
    csvReader = csv.reader(theFile)
    csvReader.next()

    for row in csvReader:
        id = row[0]
        addressText = "{}, {} {}, {}".format(row[2], row[3], row[4], row[5])

        try:
            place, (lat, lng) = g.geocode(addressText)
            coords = geojson.Point((lng, lat))
        except:
            coords = geojson.Point((0, 0))
            print addressText

        propDict = {'human': row[1], 'year': int(row[6])}

        featureStr = geojson.Feature(properties=propDict, geometry=coords)
        featList.append(featureStr)

    outFC = geojson.FeatureCollection(featList)

    geojson.dump(outFC, open(outGeoJSON,'wb'))


