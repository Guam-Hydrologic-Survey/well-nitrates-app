

const center = [13.5435056,144.7478083];

// current screen size 
var w = window.innerWidth;
var h = window.innerHeight;
console.log("w = " + w + ", h = " + h);

// Creates Leaflet map 
const map = L.map('map', {
    center: center,
    zoom: 12,
    zoomControl: false,
    measureControl: true,
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

const baseLayers = {
    'Open Street Map': osm,
    'ESRI World Imagery': ewi,
    'ESRI World Topo Map': ewtm,
    'ESRI World Street Map': ewsp,
}

const layerControl = L.control.layers(baseLayers, null, {position: 'bottomright'});
layerControl.addTo(map);

L.control.zoom({
    // options: topleft, topright, bottomleft, bottomright
    position: 'bottomright'
}).addTo(map);

L.control.scale({ position: 'bottomleft'}).addTo(map);

// Hides tooltip based on zoom level 
map.on('zoomend', function(z) {
    var zoomLevel = map.getZoom();
    if (zoomLevel >= 14 ){
        [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
            t.style.visibility = 'visible';
        });
    } else {
        [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
            t.style.visibility = 'hidden';
        });
    }
});

// Draw control bar
var drawnFeatures = new L.FeatureGroup();
map.addLayer(drawnFeatures);

var drawControl = new L.Control.Draw({
    position: "bottomright",
    draw: {
        polyline: true,
        polygon: {
            allowIntersection: false,
            showArea: true,
            showLength: true,
            shapeOptions: {
                color: "purple",
                clickable: true
            }
        },
        circle: {
            shapeOptions: {
                shapeOptions: {
                    color: "blue",
                    clickable: true
                }
            }
        },
        circlemarker: false,
        rectangle: {
            shapeOptions: {
                color: "red",
                clickable: true
            }
        },
        marker: false
    },
    edit: {
        featureGroup: drawnFeatures,
        remove: true,
    }
});

map.addControl(drawControl);

// TODO - add drawing layer to layer group; allow to toggle on and off (instead of clearing map of drawings)
map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    drawnFeatures.addLayer(layer);
})

// Plots data points from selected well to chart 
let plotData 
const plotWNL = () => {

    // Array to hold date objects
    const x_dates_conv = [];

    // Converted date strings from x_vals to JS date objects 
    for (let i = 0; i < plotData.x_vals.length; i++) {
        x_dates_conv[i] = new Date(plotData.x_vals[i]);
    };

    // Plots x,y coordinates 
    const wnlTrace = {
        x: x_dates_conv,
        y: plotData.y_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Well Nitrate Levels'
    };

    var selectorOptions = {
            buttons: [{
                step: 'year',
                stepmode: 'backward',
                count: 1,
                label: '1y'
            }, {
                step: 'year',
                stepmode: 'backward',
                count: 5,
                label: '5y'
            }, {
                step: 'year',
                stepmode: 'todate',
                count: 10,
                label: '10y'
            }, {
                step: 'year',
                stepmode: 'backward',
                count: 20,
                label: '20y'
            }, 
            {
                step: 'year',
                stepmode: 'backward',
                count: 30,
                label: '30y'
            }, 
            {
                step: 'year',
                stepmode: 'backward',
                count: 40,
                label: '40y'
            },
            {
                step: 'year',
                stepmode: 'backward',
                count: 50,
                label: '50y'
            },
            {
                step: 'all',
            }],
        };
    
    // Plot features and layout
    const layout = {
        autosize: false,
        height: 600,
        width: 1100,
        margin: {
           
        },
        title: {
            text: `<b>Nitrate Levels for Well ${plotData.name}</b>`,
            font: {
                size: 20
            }
        },
        xaxis: {
            rangeselector: selectorOptions,
        },
        yaxis: {
            title: 'ppm (mg/L)'
        },
    };

    var config = {
        toImageButtonOptions: {
            format: 'png', // png, svg, jpeg, webp
            filename: 'well_plot',
            height: 500,
            width: 700,
            scale: 1 
          }
    };

    Plotly.newPlot('large-plot', [wnlTrace], layout, {scrollZoom: true, displaylogo: false, responsive: true}, config);
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
            <br><br><br>
            <h4>Well Nitrate Levels for Well ${getStats.name}</h4>
            <hr>
            <div id="plot"></div>
            <div class="plot-btn-container">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="plotWNL()" data-bs-target="#exampleModal">
                    <i class="bi bi-arrows-angle-expand"></i> Enlarge Plot
                </button>
            </div>
        `
        // Array to hold date objects
        const x_dates_conv = [];

        // Converted date strings from x_vals to JS date objects 
        for (let i = 0; i < getStats.x_vals.length; i++) {
            x_dates_conv[i] = new Date(getStats.x_vals[i]);
        };

        // Plots x,y coordinates 
        const wnlTrace = {
            x: x_dates_conv,
            y: getStats.y_vals,
            type: 'scatter', 
            mode: 'markers',
            name: 'Well Nitrate Levels'
        };

        // Plot features and layout
        const layout = {
            autosize: false,
            width: 400,
            height: 550,
            margin: {
                l: 70,
                r: 20,
                b: 70,
                t: 20,
                pad: 30
            },
            title: {
                // text: `Nitrate Levels for Well ${getStats.name}`,
                font: {
                    size: 20
                }
            },
            xaxis: {
                // rangeselector: selectorOptions,
                rangeslider: {}
            },
            yaxis: {
                title: 'ppm (mg/L)',
                fixedrange: true
            }
        };

        var config = {
            toImageButtonOptions: {
                filename: `plot_well_${plotData.name}`
            }
        };

        Plotly.newPlot('plot', [wnlTrace], layout, {scrollZoom: true, displaylogo: false, responsive: true}, config);
}

// Filepath for map (lat, lon coords) json and data (stats, x-y vals) json 
const map_url = './static/data/data6.json';

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

  
// Map icons with shapes 
// Change marker color dynamically 
var incIcon = L.AwesomeMarkers.icon({
    icon: "fa-caret-up",
    prefix: "fa",
    markerColor: "gray",
    iconColor: "white"
});

var decIcon = L.AwesomeMarkers.icon({
    icon: "fa-caret-down",
    prefix: "fa",
    markerColor: "gray",
    iconColor: "white"
})

var insIcon = L.AwesomeMarkers.icon({
    icon: "fa-circle",
    prefix: "fa",
    markerColor: "gray",
    iconColor: "white"
})

// Gets the data from the JSON file and adds well to the map
fetch(map_url)
    .then(response => response.json())  // Requests for a json file as a response
    .then(geojson => { 

        const getWellInfo = (feature, layer) => {
            // Conditionals for marker icons
            if (feature.properties.sig == 1) {
                // const mc = feature.properties.mColor;
                switch (feature.properties.mColor) {
                    case "blue":
                        incIcon.options.markerColor = "blue";
                        break;
                    case "light-blue":
                        incIcon.options.markerColor = "cadetblue";
                        break;
                    // case "black":
                    //     incIcon.options.markerColor = "black";
                    //     break;
                    case "orange":
                        incIcon.options.markerColor = "orange";
                        break;
                    case "red":
                        incIcon.options.markerColor = "red";
                        break;
                    case "white":
                        incIcon.options.markerColor = "gray";
                        break;
                    default:
                        incIcon.options.markerColor = "green";
                        break;
                }
                layer.setIcon(incIcon)
                // console.log(incIcon.options.markerColor)
            } else if (feature.properties.sig == 0) {
                // insIcon.options.markerColor = "blue";

                switch(feature.properties.LTG2019) {
                    case 1:
                        insIcon.options.markerColor = "gray";
                        break;
                    case 2:
                        insIcon.options.markerColor = "purple";
                        break;
                    case 3:
                        insIcon.options.markerColor = "blue";
                        break;
                    case 4:
                        insIcon.options.markerColor = "black";
                        break;
                    case 5:
                        insIcon.options.markerColor = "orange";
                        break;
                    case 6:
                        insIcon.options.markerColor = "red";
                        break;
                }
                layer.setIcon(insIcon);
            } else {
                if (feature.properties.mColor == "blue") {
                    decIcon.options.markerColor = "blue";
                } else if (feature.properties.mColor == "light-blue") {
                    decIcon.options.markerColor = "purple";
                } else if (feature.properties.mColor == "black") {
                    decIcon.options.markerColor = "black";
                } else if (feature.properties.mColor == "orange") {
                    decIcon.options.markerColor = "orange";
                } else if (feature.properties.mColor == "red") {
                    decIcon.options.markerColor = "red";
                } else {
                    decIcon.options.markerColor = "gray"
                }
                layer.setIcon(decIcon)
            }

            // Label for well name
            layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom'})

            // Popups with basic well info and buttons for stats and plot
            layer.bindPopup(
                `
                <strong>Well</strong>: ${feature.properties.name} 
                <br><strong>Lat:</strong> ${feature.properties.lat} 
                <br><strong>Lon:</strong> ${feature.properties.lon}
                <br><strong>Basin:</strong> ${feature.properties.basin}
                <br><br>
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onclick="showStats()">More Info</button>
                `
            );
            // On click event on the points
            // Sends data for clicked item to global variable plotData 
            layer.on('click', pt => plotData = pt.target.feature.properties) 
            layer.on('click', pt => getStats = pt.target.feature.properties)

        }

        // Places points on the map and calls on getWellInfo function (right above) to show pop-ups 
        const mapJson = L.geoJSON(geojson, {onEachFeature: getWellInfo}).addTo(map);
        layerControl.addOverlay(mapJson, "Wells") 

        // Control search 
        const searchControl = new L.Control.Search({
            layer: mapJson,
            propertyName: 'name',
        });

        map.addControl(searchControl);
    })
    .catch(console.error);

