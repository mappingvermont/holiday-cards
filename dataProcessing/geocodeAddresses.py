import json
import geojson
import requests
import time
import os
import csv
from geopy import geocoders
from collections import defaultdict

baseDir = r'/home/charlie/Proj-15/holidayCards'
inputCSV = os.path.join(baseDir, 'dataProcessing', 'inputAddresses.csv')
outGeoJSON = os.path.join(baseDir, 'data', 'addresses.geojson')

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

        propDict = {
                    '_id': int(row[0]),
                    'human': row[1],
                    'address': row[2],
                    'city': row[3],
                    'state': row[4],
                    'zip': row[5],
                    'year': int(row[6])
                    }

        featureStr = geojson.Feature(properties=propDict, geometry=coords)
        featList.append(featureStr)

        print addressText

    outFC = geojson.FeatureCollection(featList)

    geojson.dump(outFC, open(outGeoJSON,'wb'))


