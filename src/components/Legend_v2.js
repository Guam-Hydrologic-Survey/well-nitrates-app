/* 
Legend.js
Parameters: "element" - HTML element with ID for legend left side panel offcanvas 
Return: none
*/

let nitrateToggleBtns = [];
let significanceToggleBtns = [];

const layersResetBtnId = "legend-layers-reset";
const layersRemoveBtnId = "legend-layers-remove";

export function Legend(element) {
   
    let nitrateId = "nitrate-range";
    let significanceId = "significance-level";

    element.innerHTML = /*html*/ 
    `
    <!-- Bootstrap Offcanvas for Legend -->
    <div class="offcanvas offcanvas-start offcanvas-size-sm rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="legend" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="legend-offcanvas-title">Legend</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div id="${nitrateId}"></div>
        <div id="${significanceId}"></div>
        <hr>
        <div class="d-grid">
            <button type="button" class="btn btn-primary" id="${layersResetBtnId}" title="Add layers back on map"><i class="bi bi-arrow-clockwise"></i> Reset Layers</button>
            <span class="spacer"></span>
            <button type="button" class="btn btn-secondary" id="${layersRemoveBtnId}" title="Remove layers from map"><i class="bi bi-x-lg"></i> Remove Layers</button>
        </div>
      </div>
    </div>
    `;

    legend(nitrateId, significanceId);
}

export {}

const colors = [
        {
            name: "red",
            hex: "#F50000", 
            range: "> 5"
        },
        {
            name: "orange",
            hex: "#FFAA00",
            range: "<= 5"
        },
        {
            name: "yellow",
            hex: "#FFEA00",
            range: "<= 4"
        },
        {
            name: "green",
            hex: "#38B000",
            range: "<= 3"
        },
        {
            name: "blue",
            hex: "#73DFFF", 
            range: "<= 2"
        },
        {
            name: "white",
            hex: "#FFFFFF",
            range: "< 1"
        }
    ];

/* 
sig = 1
<svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g fill="${getColors(feature.properties.LTG2019)}" stroke="black">
                            <path stroke-width="5" d="M50 0 L0 100 L100 100 Z"></path>
                        </g>
                    </svg>

sig = 0 
<svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g fill="${getColors(feature.properties.LTG2019)}" stroke="black">
                                <path stroke-width="5" d="M0 0 L50 100 L100 0 Z"></path>
                            </g>
                        </svg>

sig = -1 
<svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g fill="${getColors(feature.properties.LTG2019)}" stroke="black">
                            <path stroke-width="5" d="M50 0 L0 100 L100 100 Z"></path>
                        </g>
                    </svg>


*/

function legend(nitrateId, significanceId) {

}