

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

var map = new L.Map('map', {
	center: new L.LatLng(35,-90),
	zoom: 4,
	layers: [Esri_WorldGrayCanvas]
});	

console.log(map);

var currentYear = {}
var lastYear = {}

$.getJSON('data/addresses.geojson', function(data) {
	addressData = data
	addLayerByYear(2013)
});

function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.human);
}

function addLayerByYear(yearVal) {


  lastYear = currentYear
  currentYear = {}
  markerList = []

  for (i=0; i < addressData.features.length; i++) {

  	if (addressData.features[i].properties.year == yearVal) {

      console.log('first');

      if (lastYear[addressData.features[i].properties._id]) {
        console.log('second')

        var movingMarker = L.Marker.movingMarker(
                        [lastYear[addressData.features[i].properties._id],
                        [
                          addressData.features[i].geometry.coordinates[1], 
                          addressData.features[i].geometry.coordinates[0]
                          ]
                        ], [5000], {autostart: true}
                        ).bindPopup(addressData.features[i].properties.human);
        markerList.push(movingMarker);


      } else {
        console.log('third');

        markerList.push(L.marker([
            addressData.features[i].geometry.coordinates[1],
            addressData.features[i].geometry.coordinates[0]
            ]).bindPopup(addressData.features[i].properties.human));
      }


      currentYear[addressData.features[i].properties._id] = [addressData.features[i].geometry.coordinates[1], addressData.features[i].geometry.coordinates[0]]

  	}
  	
  }

  myLayer = L.layerGroup(markerList).addTo(map);

}

function sliderControl(yearVal) {

  console.log(yearVal);
  
  map.removeLayer(myLayer);
  
  addLayerByYear(yearVal);
}
