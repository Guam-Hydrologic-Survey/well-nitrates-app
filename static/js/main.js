// import 'leaflet-svg-shape-markers';

const center = [13.5435056,144.7478083];

// Creates Leaflet map 
const map = L.map('map', {
    center: center,
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

// ESRI World Gray Canvas 
var ewgc = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | DKValerio, MWZapata, JBulaklak, NCHabana 2022',
	maxZoom: 16
});

const baseLayers = {
    'Open Street Map': osm,
    'ESRI World Imagery': ewi,
    'ESRI World Topo Map': ewtm,
    'ESRI World Street Map': ewsp,
    'ESRI World Gray Canvas': ewgc,
}

const layerControl = L.control.layers(baseLayers, null, {position: 'bottomright'});
layerControl.addTo(map);

L.control.zoom({
    // options: topleft, topright, bottomleft, bottomright
    position: 'bottomright'
}).addTo(map);

// Control: Reset map view (goes to initial map zoom on page load)
var resetZoomBtn = L.easyButton('<i class="bi bi-map"></i>', function() {
    map.setView(center, 12);
});

const controlBar = L.easyBar([
    resetZoomBtn,
], { position: 'bottomright'})

controlBar.addTo(map);

// Hides tooltip based on zoom level 
map.on('zoomend', function(z) {
    var zoomLevel = map.getZoom();
    if (zoomLevel >= 15 ){
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
        polyline: {
            allowIntersection: true,
            shapeOptions: {
                color: "orange"
            }
        },
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
            showArea: true,
            showLength: true,
            shapeOptions: {
                color: "green",
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
        name: 'Well Nitrate-N Levels'
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
            text: `<b>Nitrate-N Levels for Well ${plotData.name}</b>`,
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
            <h4>Well Nitrate-N Levels for Well ${getStats.name}</h4>
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
            name: 'Well Nitrate-N Levels'
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
  
function getColor(sig) {
    const colors = [
        {
            name: "orange",
            hex: "#FFAA00",
            range: "<= 5"
        },
        {
            name: "black",
            hex: "#000000",
            range: "<= 4"
        },
        {
            name: "blue",
            hex: "#7A8EF5",
            range: "<= 3"
        },
        {
            name: "light-blue",
            hex: "#73DFFF", 
            range: "<= 2"
        },
        {
            name: "red",
            hex: "F50000", 
            range: "> 5"
        }
    ]
    var c;
    if (sig > 5) {
        c = colors[4].hex;
    } else {
        if (sig == 5) {
            c = colors[0].hex;
        } else if (sig == 4) {
            c = colors[1].hex;
        } else if (sig == 3) {
            c = colors[2].hex;
        } else {
            c = colors[3].hex;
        }
    }
    return c; 
}

function getTriangle(sig) {
    // var svgColor = getColor(sig);
    var svgTriangle = L.divIcon({
        html: `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="1280.000000pt" height="1130.000000pt" viewBox="0 0 1280.000000 1130.000000"
        preserveAspectRatio="xMidYMid meet">
            <metadata>
            Created by potrace 1.15, written by Peter Selinger 2001-2017.
            </metadata>
            <g transform="translate(0.000000,1130.000000) scale(0.100000,-0.100000)"
            fill="" stroke="none">
                <path d="M6266 11289 c-200 -27 -402 -141 -536 -301 -38 -46 -432 -718 -1284
                -2194 -3554 -6153 -4323 -7485 -4358 -7554 -61 -121 -81 -211 -81 -375 -1
                -115 3 -154 21 -220 91 -327 350 -567 681 -629 75 -14 614 -16 5691 -16 5077
                0 5616 2 5691 16 331 62 590 302 681 629 18 66 22 105 21 220 0 164 -20 254
                -81 375 -21 41 -756 1317 -1633 2835 -877 1518 -2126 3680 -2775 4804 -817
                1416 -1196 2063 -1234 2109 -112 134 -277 239 -445 283 -93 24 -256 32 -359
                18z"/>
            </g>
       </svg>
        `,
    });
    return svgTriangle;
}

// Gets the data from the JSON file and adds well to the map
fetch(map_url)
    .then(response => response.json())  // Requests for a json file as a response
    .then(geojson => { 

        const getWellInfo = (feature, layer) => {
            // Label for well name
            layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0,8]})

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

        const sigIncWells = L.geoJSON(geojson, {
            filter: function(feature, layer) {
                return (feature.properties.sig) == 1;
            }, 
            pointToLayer: function(feature, latlng) {
                var iconStyle = L.divIcon({
                    html: `
                    <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g fill="${getColor(feature.properties.LTG2019)}" stroke="black">
                            <path stroke-width="5" d="M50 0 L0 100 L100 100 Z"></path>
                        </g>
                    </svg>
                    `,
                    className: "",
                    iconSize: [18, 18]
                });
                return L.marker(latlng, {icon: iconStyle});
            }, 
            onEachFeature: getWellInfo}).addTo(map);
        layerControl.addOverlay(sigIncWells, "Significantly Increasing");

        const sigDecWells = L.geoJSON(geojson, {
            filter: function(feature, layer) {
                return (feature.properties.sig) == -1;
            }, 
            pointToLayer: function(feature, latlng) {
                var iconStyle = L.divIcon({
                    html: `
                    <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g fill="${getColor(feature.properties.LTG2019)}" stroke="black">
                            <path stroke-width="5" d="M0 0 L50 100 L100 0 Z"></path>
                        </g>
                    </svg>
                    `,
                    className: "",
                    iconSize: [18, 18]
                });
                return L.marker(latlng, {icon: iconStyle});
            }, 
            onEachFeature: getWellInfo}).addTo(map);
        layerControl.addOverlay(sigDecWells, "Significantly Decreasing");
        
        const insWells = L.geoJSON(geojson, {
            filter: function(feature, layer) {
                return (feature.properties.sig) == 0;
            }, 
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8, 
                    fillColor: getColor(feature.properties.LTG2019),
                    weight: 1,
                    fillOpacity: .80,
                    color: "black",
                    opacity: 1.0,
                })
            }, 
            onEachFeature: getWellInfo}).addTo(map);
        layerControl.addOverlay(insWells, "Insignificant");

        //  const mapJson = L.layerGroup([sigIncWells, sigDecWells, insWells]).addLayer().addTo(map);

        // // Control search  
        // const searchControl = new L.Control.Search({ 
        //     layer: mapJson, 
        //     propertyName: 'name', 
        //     casesensitive: false, 
        //     moveToLocation: function(latlng, title, map) { 
        //         map.flyTo(latlng, 16); 
        //     }, 
        //     textPlaceholder: 'Well Name...', 
        //     textErr: 'Sorry, could not find well.', 
        //     autoResize: true, 
        //     marker: { 
        //         icon: false, 
        //         animate: false, 
        //         circle: { 
        //             weight: 6, 
        //             radius: 30, 
        //             color: 'red', 
        //         } 
        //     } 
        // }); 

        // searchControl.on("search:locationfound", function(e) { 
        //     e.layer.openPopup(); 
        // }); 
        // map.addControl(searchControl);
    })
    .catch(console.error);

    var square = L.shapeMarker([13.45409, 144.7594], {
        shape: "square",
        radius: 20
    }).addTo(map);