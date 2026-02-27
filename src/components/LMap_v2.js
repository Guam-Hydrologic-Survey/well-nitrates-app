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
import { MarkerIcon } from "./MarkerIcon.js";

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
            { nitrateRange0: L.layerGroup() },
            { nitrateRange1: L.layerGroup() },
            { nitrateRange2: L.layerGroup() },
            { nitrateRange3: L.layerGroup() },
            { nitrateRange4: L.layerGroup() },
            { nitrateRange5: L.layerGroup() },
            { nitrateRange6: L.layerGroup() }
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

    // function addLayerObjectsToMap(rangeLayers) {
    //     rangeLayers.forEach((layer) => {
    //         for (const [key, value] of Object.entries(layer)) {
    //             layer[key].addTo(map);
    //         }
    //     });
    // }

    function addLayerObjectsToMap(rangeLayers) {
        rangeLayers.forEach((layer) => {
            for (const [key, value] of Object.entries(layer)) {
                value.addTo(map);
            }
        });
    }

    function removeLayerObjectsFromMap(rangeLayers) {
        rangeLayers.forEach((layer) => {
            for (const [key, value] of Object.entries(layer)) {
                map.removeLayer(value);
            }
        })
    }

    document.addEventListener('DOMContentLoaded', (e) => {
        setTimeout(() => {

            // addLayerObjectsToMap(legendLayers.nitrateLayers);
            addLayerObjectsToMap(legendLayers.significantLayers);

            // TODO - simplify adding layers back to map
            // Resets layers on map (adds everything back)
            document.getElementById(layersResetBtnId).addEventListener('click', () => {

                // addLayerObjectsToMap(legendLayers.nitrateLayers);
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

                // removeLayerObjectsFromMap(legendLayers.nitrateLayers);
                removeLayerObjectsFromMap(legendLayers.significantLayers);
            });

            // TODO - change to for loop, add each chlorideRange layer into an array list (same goes for productionRange layers)

            // Event listeners for chloride range layers 
            // for (let i = 0; i < nitrateToggleBtns.length; i++) {
            //     document.getElementById(nitrateToggleBtns[i]).addEventListener('click', () => {
            //         for (const [key, value] of Object.entries(legendLayers.nitrateLayers[i])) {
            //             checkLayerExistence(legendLayers.nitrateLayers[i][key]);
            //         }
            //     })
            // }

            // Event listeners for production range layers 
            // for (let i = 0; i < significanceToggleBtns.length; i++) {
            //     document.getElementById(significanceToggleBtns[i]).addEventListener('click', () => {
            //             // Loop for layer objects (below) must be [i + 1], since legendLayers.significantLayers.length (10) > significanceToggleBtns.length (9)
            //             for (const [key, value] of Object.entries(legendLayers.significantLayers[i])) {
            //                 checkLayerExistence(legendLayers.significantLayers[i][key]);
            //             }
            //         });
            // }
            significanceToggleBtns.forEach((id, i) => {
                const checkbox = document.getElementById(id);
                const layerObj = legendLayers.significantLayers[i];

                checkbox.addEventListener("change", () => {
                    Object.values(layerObj).forEach(layer => {
                        if (checkbox.checked) {
                            layer.addTo(map);
                            console.log(`Checked ${checkbox}`)
                        } else {
                            map.removeLayer(layer);
                            console.log(`Unchecked ${checkbox}`)
                        }
                    })
                })
            })
        }, 1000);
    });
    
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
    
    // get data 
    fetch(geoJsonUrl)
        .then(response => response.json())
        .then(geojson => {
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
                        SidePanel(point.target.feature.properties);
                        pointSelectLayers = [];
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
                        } else {
                            alreadySelected(document.getElementById("notif"), point.target.feature.properties.name);
                        }
                    }
                })
            }

            function createSigLayer(sig_level) {
                const wells = L.geoJSON(geojson, {
                    filter: feature => feature.properties.sig == sig_level,
                    pointToLayer: function(feature, latlng) {
                        let point = L.marker(latlng, {
                            icon: MarkerIcon(feature.properties)
                        });
                        return point;
                    }, 
                    onEachFeature: getValues
                });
                return wells;
            }

            function createNitrateLayer(ltg) {
                const wells = L.geoJSON(geojson, {
                    filter: feature => feature.properties.LTG2019 == ltg,
                    pointToLayer: function(feature, latlng) {
                        let point = L.marker(latlng, {
                            icon: MarkerIcon(feature.properties)
                        });
                        return point;
                    }, 
                    onEachFeature: getValues
                });
                return wells;
            }

            const sigIncWells = createSigLayer(1);
            const sigDecWells = createSigLayer(-1);
            const insWells = createSigLayer(0);

            const nitrateLevel6 = createNitrateLayer(6);
            const nitrateLevel5 = createNitrateLayer(5);
            const nitrateLevel4 = createNitrateLayer(4);
            const nitrateLevel3 = createNitrateLayer(3);
            const nitrateLevel2 = createNitrateLayer(2);
            const nitrateLevel1 = createNitrateLayer(1);
            const nitrateLevel0 = createNitrateLayer(0);

            sigIncWells.addTo(legendLayers.significantLayers[0].increasing);
            sigDecWells.addTo(legendLayers.significantLayers[1].decreasing);
            insWells.addTo(legendLayers.significantLayers[2].insignificant);

            nitrateLevel6.addTo(legendLayers.nitrateLayers[6].nitrateRange6);
            nitrateLevel5.addTo(legendLayers.nitrateLayers[5].nitrateRange5);
            nitrateLevel4.addTo(legendLayers.nitrateLayers[4].nitrateRange4);
            nitrateLevel3.addTo(legendLayers.nitrateLayers[3].nitrateRange3);
            nitrateLevel2.addTo(legendLayers.nitrateLayers[2].nitrateRange2);
            nitrateLevel1.addTo(legendLayers.nitrateLayers[1].nitrateRange1);
            nitrateLevel0.addTo(legendLayers.nitrateLayers[0].nitrateRange0);

            // const mapJson = L.layerGroup([sigIncWells, sigDecWells, insWells]).addTo(map);
            // const mapJson = L.layerGroup([sigIncWells, sigDecWells, insWells])
            const mapJson = L.layerGroup();
            Object.values(legendLayers.significantLayers).forEach(obj => {
                Object.values(obj).forEach(group => {
                    mapJson.addLayer(group);
                })
            })

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