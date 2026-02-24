/* 
LMap.js 
Parameters: "element" - HTML element with ID containing Leaflet map
Return: none
*/

// components 
import { BaseLayers } from "./Baselayers.js";
import { TitleCard } from "./TitleCard.js";
import { SidePanel } from "./SidePanel.js";
import { MarkerPopup } from "./MarkerPopup.js";
import { MultiplePlots } from "./Plot.js";
import { completeSelection, additionalSelection, alreadySelected } from "./Toast.js";
import { SelectionView, choices, choicesLayers, createCheckBox } from "./SelectionView.js";

// utils 
import { geoJsonUrl } from "../utils/dataSource.js";
import { createChoice } from "../utils/createChoice.js";
import { getColors } from "../utils/getColor.js";
import { nitrateToggleBtns, significanceToggleBtns, layersResetBtnId, layersRemoveBtnId } from "./Legend_v2.js";

let geoJsonData;

let selectionMode = "";

const lassoControl = L.control.lasso({ position: "bottomright" });

let pointSelectBtnState = false;
let pointSelectLayers = [];

const pointSelectBtn = L.easyButton({
    states: [
        {
            stateName: 'detrigger-pointSelectBtn',
            icon: '<img src="./src/assets/hand-index-thumb.svg">',
            title: 'Select points to plot on click',
            onClick: function(btn, map) {
                console.log("Turned on point selection through click");
                btn.state('trigger-pointSelectBtn');
                pointSelectBtnState = true;
                console.log(pointSelectBtnState);
                map.on("click", function(point) {
                    console.log(point.latlng);
                    // console.log(point.target.feature.properties.name);
                    console.log("Selected a point.")
                });
                selectionMode = "click";
                // additionalSelection(document.getElementById("notif"));
                SelectionView();
            }
        },
        {
            stateName: 'trigger-pointSelectBtn',
            icon: '<img src="./src/assets/hand-index-thumb-fill.svg">',
            title: "Turn off click-on-point selection",
            onClick: function(btn) {
                console.log("Turned off point selection through click");
                btn.state('detrigger-pointSelectBtn');
                pointSelectBtnState = false;
                pointSelectLayers = [];
                // choicesLayers = [];
                const selectionView = document.getElementById("selection-view-offcanvas");
                const selectionViewOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(selectionView);
                selectionViewOffcanvas.hide();
            }
        }
    ]
});

export function LMap(element) {

    const center = [13.519506727800149, 144.82649803161624];
    const defaultZoom = 13;
    const maxZoom = 19; 

    // creates Leaflet map 
    const map = L.map(element, {
        center: center,
        zoom: defaultZoom,
        zoomControl: false,
    });

    const baseLayers = BaseLayers(map, maxZoom);

    const layerControl = L.control.layers(baseLayers, null, { position: "bottomright" });
    layerControl.addTo(map);

    TitleCard(map);

    const zoomControl = L.control.zoom({
        // options: topleft, topright, bottomleft, bottomright
        position: 'bottomright'
    });
    zoomControl.addTo(map);

    const resetZoomBtn = L.easyButton('<img src="./src/assets/geo-fill.svg">', function() {
        map.setView(center, defaultZoom);
    }, "Reset map view");

    const controlBar = L.easyBar([
        resetZoomBtn,
    ], { position: "bottomright" });

    controlBar.addTo(map);

    // draw control bar
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

    map.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        drawnFeatures.addLayer(layer);
    });

    if (map.hasLayer(drawnFeatures)) {
        layerControl.addOverlay(drawnFeatures, "Drawings");
    } 

    let legendLayers = {
        nitrateLayers: [
            { nitrateRange5: L.layerGroup() },
            { nitrateRange4: L.layerGroup() },
            { nitrateRange3: L.layerGroup() },
            { nitrateRange2: L.layerGroup() },
            { nitrateRange1: L.layerGroup() },
            { nitrateRange0: L.layerGroup() }
        ],
        significantLayers: [
            { increasing: L.layerGroup() },
            { decreasing: L.layerGroup() },
            { insignificant: L.layerGroup() }
        ]
    }

    function checkLayerExistence(layer) {
        if (!map.hasLayer(layer)) {
            layer.addTo(map);
        } else {
            map.removeLayer(layer);
        }
    }

    function addLayerObjectsToMap(rangeLayers) {
        rangeLayers.forEach((layer) => {
            for (const [key, value] of Object.entries(layer)) {
                layer[key].addTo(map);
            }
        });
    }

    function removeLayerObjectsFromMap(rangeLayers) {
        rangeLayers.forEach((layer) => {
            for (const [key, value] of Object.entries(layer)) {
                map.removeLayer(layer[key]);
            }
        })
    }

    document.addEventListener('DOMContentLoaded', (e) => {
        setTimeout(() => {

            addLayerObjectsToMap(legendLayers.nitrateLayers);
            addLayerObjectsToMap(legendLayers.significantLayers);

            // TODO - simplify adding layers back to map
            // Resets layers on map (adds everything back)
            document.getElementById(layersResetBtnId).addEventListener('click', () => {

                addLayerObjectsToMap(legendLayers.nitrateLayers);
                addLayerObjectsToMap(legendLayers.significantLayers);

                // Check the respective checkboxes
                // Check all checkboxes value
                const checkboxes = document.querySelectorAll('.form-check-input');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = true;
                });
            });

            // TODO - add event listener for REMOVE LAYERS button on Legend panel 
            document.getElementById(layersRemoveBtnId).addEventListener('click', () => {
                // PSEUDOCODE: uncheck all boxes, remove all chloride and production layers from map 
                const checkboxes = document.querySelectorAll('.form-check-input');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                removeLayerObjectsFromMap(legendLayers.nitrateLayers);
                removeLayerObjectsFromMap(legendLayers.significantLayers);
            });

            // TODO - change to for loop, add each chlorideRange layer into an array list (same goes for productionRange layers)

            // Event listeners for chloride range layers 
            for (let i = 0; i < nitrateToggleBtns.length; i++) {
                document.getElementById(nitrateToggleBtns[i]).addEventListener('click', () => {
                    for (const [key, value] of Object.entries(legendLayers.nitrateLayers[i])) {
                        checkLayerExistence(legendLayers.nitrateLayers[i][key]);
                    }
                })
            }

            // Event listeners for production range layers 
            for (let i = 0; i < significanceToggleBtns.length; i++) {
                document.getElementById(significanceToggleBtns[i]).addEventListener('click', () => {
                        // Loop for layer objects (below) must be [i + 1], since legendLayers.significantLayers.length (10) > significanceToggleBtns.length (9)
                        for (const [key, value] of Object.entries(legendLayers.significantLayers[i])) {
                            checkLayerExistence(legendLayers.significantLayers[i][key]);
                        }
                    });
            }
        }, 1000);
    });

    // console.log(pointSelectBtn.options.states);

    // const pointSelectionControls = L.easyBar([
    //     pointSelectBtn,
    // ], { position: "bottomright" });

    // pointSelectionControls.addTo(map);
    
    lassoControl.addTo(map); 

    // hides tooltip based on zoom level 
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

    // array holding well with status for use on point selection through click 
    // let choices = [];
    
    // get data 
    fetch(geoJsonUrl)
        .then(response => response.json())
        .then(geojson => {
            // let popup = L.popup()
            const getValues = (feature, layer) => {
                // popup with basic well info and buttons for stats and plot
                layer.bindPopup(MarkerPopup(feature.properties.name, feature.properties.basin, feature.properties.lat, feature.properties.lon, feature.properties.desc)); 

                // label for well name
                layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0,10]});

                // check if point selection button has been triggered 
                layer.on("click", point => { 
                    map.closePopup(); 
                    // prevents popup from opening since side panel automatically opens 
                    if (!pointSelectBtnState) {
                        // map.closePopup(); 
                        SidePanel(point.target.feature.properties);
                        pointSelectLayers = [];
                        // choicesLayers = [];
                        choicesLayers.length = 0;
                       
                    } else {
                        console.log(point.target.feature.properties.name);

                        // check if point was already clicked/selected 
                        if (!pointSelectLayers.includes(point.target.feature.properties)) {
                            pointSelectLayers.push(point.target.feature.properties);
                            choicesLayers.push(point.target.feature.properties);
                            createCheckBox(point.target.feature.properties.name);

                            // create choice object and add to choices array 
                            choices.push(createChoice(point.target.feature.properties.name, true));
                            // console.log(choices);

                        } else {
                            alreadySelected(document.getElementById("notif"), point.target.feature.properties.name);
                        }
                    }
                })
            }

            // geoJsonData = L.geoJSON(geojson, { onEachFeature: (getValues) }).addTo(map);
            // layerControl.addOverlay(geoJsonData, "Layer Name");

            const sigIncWells = L.geoJSON(geojson, {
            filter: function(feature, layer) {
                return (feature.properties.sig) == 1;
            }, 
            pointToLayer: function(feature, latlng) {
                var iconStyle = L.divIcon({
                    html: `
                    <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g fill="${getColors(feature.properties.LTG2019)}" stroke="black">
                            <path stroke-width="5" d="M50 0 L0 100 L100 100 Z"></path>
                        </g>
                    </svg>
                    `,
                    className: "",
                    iconSize: [18, 18]
                });
                return L.marker(latlng, {icon: iconStyle});
            }, 
            onEachFeature: getValues}).addTo(map);
            layerControl.addOverlay(sigIncWells, "Significantly Increasing");

            sigIncWells.addTo(legendLayers.significantLayers[0].increasing)

            const sigDecWells = L.geoJSON(geojson, {
                filter: function(feature, layer) {
                    return (feature.properties.sig) == -1;
                }, 
                pointToLayer: function(feature, latlng) {
                    var iconStyle = L.divIcon({
                        html: `
                        <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g fill="${getColors(feature.properties.LTG2019)}" stroke="black">
                                <path stroke-width="5" d="M0 0 L50 100 L100 0 Z"></path>
                            </g>
                        </svg>
                        `,
                        className: "",
                        iconSize: [18, 18]
                    });
                    return L.marker(latlng, {icon: iconStyle});
                }, 
                onEachFeature: getValues}).addTo(map);
            layerControl.addOverlay(sigDecWells, "Significantly Decreasing");

            sigDecWells.addTo(legendLayers.significantLayers[1].decreasing);
            
            const insWells = L.geoJSON(geojson, {
                filter: function(feature, layer) {
                    return (feature.properties.sig) == 0;
                }, 
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8, 
                        fillColor: getColors(feature.properties.LTG2019),
                        weight: 1,
                        fillOpacity: 1.0,
                        color: "black",
                        opacity: 1.0,
                    })
                }, 
                onEachFeature: getValues}).addTo(map);
            layerControl.addOverlay(insWells, "Insignificant");

            insWells.addTo(legendLayers.significantLayers[2].insignificant);

            const mapJson = L.layerGroup([sigIncWells, sigDecWells, insWells]).addTo(map);

            // for search control 
            let searchCoords = [];
            let searchMarker = L.circle(searchCoords, {
                color: "red",
                fillColor: "",
                fillOpacity: 0.5,
                weight: 3,
                radius: 300,
            });

            // search control 
            const searchControl = new L.Control.Search({ 
                container: "search-box",
                layer: mapJson,
                initial: false,
                collapsed: false,
                propertyName: 'name', 
                casesensitive: false, 
                textPlaceholder: 'Search wells...', 
                textErr: 'Sorry, could locate well. Please try again.', 
                autoResize: true, 
                moveToLocation: function(latlng, title, map) { 
                    searchCoords = latlng;
                    searchMarker = L.circle(searchCoords, {
                        color: "red",
                        fillColor: "",
                        fillOpacity: 0.5,
                        weight: 3,
                        radius: 80,
                        className: "search-pulse",
                    });
                    searchMarker.addTo(map);
                    map.flyTo(latlng, 16); 
                    setTimeout(() => {
                        searchMarker.remove();
                      }, 8000);
                }, 
                marker: false,
            }); 

            searchControl.on("search:locationfound", function(point) { 
                // point.layer.openPopup(); 
                SidePanel(point.layer.feature.properties);
                document.getElementById("searchtext15").value = "";
            }); 

            // initialize search 
            map.addControl(searchControl);
        });

    // leaflet lasso configuration 
    map.on("lasso.finished", event => {
        // error handing checks if there are layers within selection using array.length
        if (event.layers.length != 0) {
            completeSelection(document.getElementById("notif"), event.layers);
            MultiplePlots(event.layers, document.getElementById("multi-plot-view-contents"), "lasso");
            // console.log(event.layers);
        } 

        selectionMode = "lasso";
    });

    // functionality for #select-more-points btn in FullscreenModal.js 
    let fullScreenModalMorePoints = document.getElementById("select-more-points");
    fullScreenModalMorePoints.addEventListener("click", () => {
        additionalSelection(document.getElementById("notif"));
        if (lassoControl.enabled()) {
            lassoControl.disable();
        } else {
            lassoControl.enable();
        }
    });
}

// other components have access to this export 
// TODO - include point selection control as an export along with lassoControl to be triggered back on/off upon clicking "Select more points to plot" button in FullscreenModal.js 
export { selectionMode, lassoControl, pointSelectBtn };

let selectionState;

export function updateSelectionStates() {
    selectionState = {
        method: "",
        state: false,
    }

    for (let input of document.querySelectorAll('input')) {
        if (input.checked) {
            switch (input.className) { }
        }
    }
}