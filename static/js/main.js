// import * as GeoSearch from 'leaflet-geosearch';

// Creates Leaflet map 
const map = L.map('map', {
    center: [13.4453556,144.7043994],
    zoom: 12,
    zoomControl: false,
})

const baseLayersZoom = 19;

// Open Street Map layer 
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: baseLayersZoom, 
    attribution: '© OpenStreetMap | DKValerio, MWZapata, JBulaklak, NCHabana 2022'
}).addTo(map)

// ESRI World Street Map 
const ewsp = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012 | DKValerio, MWZapata, JBulaklak, NCHabana 2022'
})

// ESRI World Topo Map 
const ewtm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom, 
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community | DKValerio, MWZapata, JBulaklak, NCHabana 2022'
});

// ESRI World Imagery 
const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community | DKValerio, MWZapata, JBulaklak, NCHabana 2022'
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

const layerControl = L.control.layers(null, baseLayers, {position: 'bottomright'});
layerControl.addTo(map);

// Search bar 
// const search = new GeoSearch.GeoSearchControl({
//     provider: new GeoSearch.OpenStreetMapProvider(),
// });

// map.addControl(search);


L.control.zoom({
    // options: topleft, topright, bottomleft, bottomright
    position: 'bottomright'
}).addTo(map);

// Control: Reset map view (goes to initial map zoom on page load)
var resetMapZoom = L.Toolbar2.Action.extend({ 
    options: {
        toolbarIcon: {
            html: '&#xF425;', // '&#x2302;', 
            tooltip: 'Reset Map View'
        }
    },
    addHooks: function() {
        map.setView([13.4453556,144.7043994], 12);
    }
});

var resetZoomBtn = L.easyButton('<i class="bi bi-map"></i>', function() {
    map.setView([13.4453556,144.7043994], 12);
});

var drawBtn = L.easyButton('<i class="bi bi-pencil-fill"></i>', function() {
    console.log('Clicked on draw btn')
});

var undoBtn = L.easyButton('<i class="bi bi-arrow-counterclockwise"></i>', function() {
    console.log('Clicked on undo btn')
});

var redoBtn = L.easyButton('<i class="bi bi-arrow-clockwise"></i>', function() {
    console.log('Clicked on redo btn')
});

var trashBtn = L.easyButton('<i class="bi bi-trash3-fill"></i>', function() {
    console.log('Clicked on trash btn')
});

var controlBar = L.easyBar([
    resetZoomBtn,
    drawBtn,
    undoBtn,
    redoBtn,
    trashBtn
])

controlBar.addTo(map);

// Control: Measure distance and area 

// Control: Drop a pin 

// Control: Draw a line 

// Control: Draw a polygon 

// Control: Draw a rectangle 

// Control: Draw a circle 

// Control group for toolbar 
new L.Toolbar2.Control({
    position: 'bottomright',
    actions: [resetMapZoom]
    // actions: [resetZoom]
}).addTo(map);

// Plots data points from selected well to chart 
let plotData 
const plotWNL = () => {

    // Array to hold date objects
    const x_dates_conv = [];

    // Converted date strings from x_vals to JS date objects 
    for (let i = 0; i < plotData.x_vals.length; i++) {
        x_dates_conv[i] = new Date(plotData.x_vals[i]);
        console.log(`${plotData.x_vals[i]} --> ${x_dates_conv[i]}`);
    };

    // Plots x,y coordinates 
    const wnlTrace = {
        x: x_dates_conv,
        y: plotData.y_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Well Nitrate Levels'
    };

    // Plot features and layout
    const layout = {
        title: {
            text: `Nitrate Levels for Well ${plotData.name}`,
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
    };

    var config = {
        responsive: true
    };

    Plotly.newPlot('plot', [wnlTrace], layout, {scrollZoom: true, displaylogo: false}, config);
}

// Shows the stats on the left side panel 
// First row: General statistics
// Second row: Additional statistics wrapped in an accordion 
let getStats
const showStats = () => {
    document.getElementById("sidebar").innerHTML =
        `
            <div>
                <h4>Well ${getStats.name}</h4>
                <p class="stats-location">${getStats.lat}, ${getStats.lon}</p>
                <p class="stats-location">${getStats.basin} Basin</p>
                <hr/>
            </div>

            <div class="stats-row">
                <div class="stats-col">
                    <p class="stats-text">Average</p>
                    <p class="stats-text">Min</p>
                    <p class="stats-text">Max</p>
                    <p class="stats-text">Mode</p>
                    <p class="stats-text">Slope</p>
                    <p class="stats-text">Intercept</p>
                    <p class="stats-text">Standard Deviation</p>
                    <p class="stats-text">Degrees of Freedom</p>
                    <br>
                    <br>
                </div>
                <div class="stats-col">
                    <p class="stats-num">${getStats.average}</p>
                    <p class="stats-num">${getStats.min}</p>
                    <p class="stats-num">${getStats.max}</p>
                    <p class="stats-num">${getStats.mode}</p>
                    <p class="stats-num">${getStats.slope}</p>
                    <p class="stats-num">${getStats.intercept}</p>
                    <p class="stats-num">${getStats.std_dev}</p>
                    <p class="stats-num">${getStats.deg_of_free}</p>
                    <br>
                </div>
            </div>
            
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        View Full ${getStats.name} Statistics
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="stats-row">
                            <div class="stats-col">
                                <p class="stats-text-full">Rcrit</p>
                                <p class="stats-text-full">Rcalc Mo</p>
                                <p class="stats-text-full">Rcalc New</p>
                                <p class="stats-text-full">EA</p>
                                <p class="stats-text-full">EA X<sup>2</sup></p>
                                <p class="stats-text-full">Base Year</p>
                                <p class="stats-text-full">End Year</p>
                                <p class="stats-text-full">Top 1</p>
                                <p class="stats-text-full">Top 2</p>
                                <p class="stats-text-full">Bottom 1</p>
                                <p class="stats-text-full">Bottom 2</p>
                                <p class="stats-text-full">Increase in 10 Years</p>
                                <p class="stats-text-full">Increase in 20 Years</p>
                                <p class="stats-text-full">1ppm in X Years</p>
                                <p class="stats-text-full">Significance</p>
                                <p class="stats-text-full">MoP</p>
                                <p class="stats-text-full">Annual Frequency</p>
                            </div>
                            <div class="stats-col">
                                <p class="stats-num-full">${getStats.rcrit}</p>
                                <p class="stats-num-full">${getStats.rcalc_mo}</p>
                                <p class="stats-num-full">${getStats.rcalc_new}</p>
                                <p class="stats-num-full">${getStats.EA}</p>
                                <p class="stats-num-full">${getStats.EA_X2}</p>
                                <p class="stats-num-full">${getStats.base_year}</p>
                                <p class="stats-num-full">${getStats.end_year}</p>
                                <p class="stats-num-full">${getStats.top1}</p>
                                <p class="stats-num-full">${getStats.top2}</p>
                                <p class="stats-num-full">${getStats.bottom1}</p>
                                <p class="stats-num-full">${getStats.bottom2}</p>
                                <p class="stats-num-full">${getStats.inc_10_Yrs}</p>
                                <p class="stats-num-full">${getStats.inc_20_Yrs}</p>
                                <p class="stats-num-full">${getStats.x_yrs_1ppm}</p>
                                <p class="stats-num-full">${getStats.sig}</p>
                                <p class="stats-num-full">${getStats.MoP}</p>
                                <p class="stats-num-full">${getStats.annual_freq}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `
}

// All in one function to build side panel with both stats and plot for selected well 
// let getData
// const showData = () => {
// }

// Filepaths for map (lat, lon coords) json and data (stats, x-y vals) json 
const data_url = './static/data/data3.json';
const map_url_old = './static/data/data4.json'; 
const map_url = './static/data/data5.json';

// Testing single marker to trigger on click event
// L.marker([13.45409, 144.7594]).addTo(map).on('click', function(e) {
//     console.log(e.latlng);
// });

// Map colored icons 
const blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const grayIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const violetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

// Gets the data from the JSON file and adds well to the map
fetch(map_url)
    .then(response => response.json())  // Requests for a json file as a response
    .then(geojson => { 
        const getWellInfo = (feature, layer) => {
            // Conditionals for marker icons
            if (feature.properties.sig == 1) {
                layer.setIcon(greenIcon);
            } else if (feature.properties.sig == 0) {
                layer.setIcon(grayIcon);
            } else {
                layer.setIcon(blueIcon);
            }

            // Popups with basic well info and buttons for stats and plot 
            layer.bindPopup(
                `
                <strong>Well</strong>: ${feature.properties.name} 
                <br><strong>Lat:</strong> ${feature.properties.lat} 
                <br><strong>Lon:</strong> ${feature.properties.lon}
                <br><strong>Basin:</strong> ${feature.properties.basin}
                <br><br>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="plotWNL()" data-bs-target="#exampleModal">Plot</button>
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onclick="showStats()">Statistics</button>
                `
            );
            // On click event on the points
            // Sends data for clicked item to global variable plotData 
            layer.on('click', pt => plotData = pt.target.feature.properties) 
            layer.on('click', pt => getStats = pt.target.feature.properties)

            // // Completes both for plot and stats data 
            // layer.on('click', pt => getData = pt.target.feature.properties)
        }

        // Places points on the map and calls on getWellInfo function (right above) to show pop-ups 
        const mapJson = L.geoJSON(geojson, {onEachFeature: getWellInfo}).addTo(map);
        layerControl.addOverlay(mapJson, "Wells") 
    })
    .catch(console.error);

// Used to test functionality of Plot button 
function showMessage(name) {
    console.log(`Clicked on Statistics btn`);
    alert(`Clicked on Statistics btn`);
}