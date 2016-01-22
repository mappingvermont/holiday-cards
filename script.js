var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

var map = new L.Map('map', {
    center: new L.LatLng(35, -90),
    zoom: 4,
    layers: [Esri_WorldGrayCanvas]
});

var currentYear = {}
var lastYear = {}

addLayerByYear(2013);

function addLayerByYear(yearVal) {

    lastYear = currentYear
    currentYear = {}
    markerList = []

    for (i in addresses) {

        if (addresses[i][yearVal]) {

            if (lastYear[i]) {
                console.log(addresses[i]);

                var movingMarker = L.Marker.movingMarker(
                    [
                        lastYear[i],
                        addresses[i][yearVal]
                    ], [5000], {
                        autostart: true
                    }
                ).bindPopup(addresses[i]['popupText']);
                markerList.push(movingMarker);

            } else {

                markerList.push(L.marker(
                    addresses[i][yearVal]
                ).bindPopup(addresses[i]['popupText']));

            }

            currentYear[i] = addresses[i][yearVal]

        }

    }

    console.log(markerList);

    myLayer = L.layerGroup(markerList).addTo(map);
}


function sliderControl(yearVal) {

    console.log(yearVal);

    map.removeLayer(myLayer);

    addLayerByYear(yearVal);
}