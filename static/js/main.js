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

// Array to house well markers on the map
var wellMarkers = [];
var wellPlot = [];

// Filepaths for map (lat, lon coords) json and data (stats, x-y vals) json 
const data_url = './static/data/data3.json';
const map_url = './static/data/mapInfo1.json';

// Gets the data from the JSON file and adds well to the map
fetch(map_url)
    .then(response => response.json())
    .then(geojson => {
        const mapJson = L.geoJSON(geojson).addTo(map);
        layerControl.addOverlay(mapJson, 'Wells');
    })
    .catch(console.error);
console.log(wellMarkers)

// Used to test functionality of Plot button 
function showMessage() {
    alert('Clicked');
}

// let plotData 

// Plots data points from selected well to chart 
// TODO: Function that will pass plot data based on selected well on map 
const plotWNL = (selectedWell) => {
    console.log(dateTime);
    console.log(values)
    console.log(selectedWell)
    // Plots x,y coordinates 
    const wnlTrace = {
        x: dateTime,
        y: values,
        // Dummy data for preliminary testing 
        // x: [2015,2016,2017,2018,2019,2020], 
        // y: [1,2,3,4,5,6],
        type: 'scatter', 
        mode: 'markers',
        name: 'Well Nitrate Levels'
    }
    // Plot features and layout
    const layout = {
        title: {
            text: `Nitrate Levels for Well ${selectedWell}`,
            font: {
                size: 20
            }
        },
        xaxis: {
            title: 'Years'
        },
        yaxis: {
            title: 'ppm (mg/L)'
        }
    }
    Plotly.newPlot('plot', [wnlTrace], layout)
}