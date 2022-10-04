const map = L.map('map', {
    center: [13.4453556,144.7043994],
    zoom: 12,
})

const baseLayersZoom = 19;

// Open Street Map layer 
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: baseLayersZoom, 
    attribution: '© OpenStreetMap'
}).addTo(map)

// ESRI World Street Map 
const ewsp = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
})

// ESRI World Topo Map 
const ewtm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom, 
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

// ESRI World Imagery 
const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}); 

// ESRI World Shaded Relief 
const ewsr = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri'
});


const baseLayers = {
    'Open Street Map': osm,
    'ESRI World Street Map': ewsp,
    'ESRI World Topo Map': ewtm,
    'ESRI World Imagery': ewi,
    'ESRI World Shaded Relief': ewsr
}

const layerControl = L.control.layers(baseLayers).addTo(map)

// Gets the data from the JSON file and adds well to the map
fetch('./static/data/data3.json')
    .then(response => response.json())
    .then(data => {
        // For loop traverses through each well in JSON file, extracts coordinates and adds points to the map
        for (const well of data.wells) {
            console.log(well.Name + ', Coords: [' + well.Location.Lat + ', ' + well.Location.Lon + ']');
            var latLng = L.latLng(well.Location.Lat, well.Location.Lon);
            console.log(latLng);
            L.marker(latLng).addTo(map)
                .bindPopup(
                    `Well: ${well.Name} <br> Lat: ${well.Location.Lat} <br> Lon: ${well.Location.Lon}`
                );
        }
    })
    .catch(console.error);