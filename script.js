

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

var map = new L.Map('map', {
	center: new L.LatLng(35,-90),
	zoom: 4,
	layers: [Esri_WorldGrayCanvas]
});	


$.getJSON('data/addresses.geojson', function(data) {
	window.data = data
	addLayerByYear(2013)
});

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
        layer.bindPopup(feature.properties.human);
}

function addLayerByYear(yearVal) {

  window.myLayer = L.geoJson(false, {onEachFeature: onEachFeature});

  for (i=0; i < window.data.features.length; i++) {

  	if (window.data.features[i].properties.year == yearVal) {
  		myLayer.addData(window.data.features[i])
  	}
  	
  }

  window.myLayer.addTo(map);

}

function sliderControl(yearVal) {
  console.log(yearVal);
  map.removeLayer(window.myLayer);
  addLayerByYear(yearVal);
}
