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
    <div class="offcanvas offcanvas-start offcanvas-size-sm rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="legend-offcanvas" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
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

// import these into LMap
export { nitrateToggleBtns, significanceToggleBtns, layersResetBtnId, layersRemoveBtnId }

const height = 34;
const width = 34;
const viewboxHeight = 100;
const viewboxWidth = 100;

// nitrate level colors (in hex codes)
const colors = [
        {
            name: "red",
            hex: "#F50000", 
            range: "> 5"
        },
        {
            name: "orange",
            hex: "#FFAA00",
            range: "(4, 5]"
        },
        {
            name: "yellow",
            hex: "#FFEA00",
            range: "(3, 4]"
        },
        {
            name: "green",
            hex: "#38B000",
            range: "(2, 3]"
        },
        {
            name: "blue",
            hex: "#73DFFF", 
            range: "(1, 2]"
        },
        {
            name: "white",
            hex: "#FFFFFF",
            range: "< 1"
        }
    ];


const shapes = [
    {
        name: "Increasing",
        sig_lvl: 1,
        svg: `<svg height="${height}" width="${width}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <title>Significantly Increasing</title>
                        <g fill="#d9d9d9" stroke="black">
                            <path stroke-width="4" d="M50 0 L0 100 L100 100 Z"></path>
                        </g>
                    </svg>`
    },
    {
        name: "Insignificant",
        sig_lvl: 0,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24">
        <title>Insignificant</title>
        <circle cx="12" cy="12" r="10" fill="#d9d9d9" stroke="black" stroke-width="1"/></svg>`
    },
    {
        name: "Decreasing",
        sig_lvl: -1,
        svg: `<svg height="${height}" width="${width}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <title>Significantly Decreasing</title>
                                    <g fill="#d9d9d9" stroke="black">
                                        <path stroke-width="4" d="M0 0 L50 100 L100 0 Z"></path>
                                    </g>
                                </svg>`
    }
];

function legend(nitrateId, significanceId) {
    let nitrate = document.getElementById(nitrateId);
    nitrate.innerHTML = /*html*/ 
    `
    <h6>Nitrate-N Concentration</h6><hr>
    `;

    let sig = document.getElementById(significanceId);
    sig.innerHTML = /*html*/
    `
    <br><h6>Significance Level</h6><hr>
    `;

    // create checkboxes for significance level 
    for (let i = 0; i < shapes.length; i++) {
        let toggleBtnId = `significance-level-${shapes.name}`;
        significanceToggleBtns.push(toggleBtnId);
        sig.innerHTML += /*html*/
        `
        <div class="form-check" style="padding-bottom: 10px;">
            <input class="form-check-input checkbox-input" type="checkbox" value="${toggleBtnId}" id="${toggleBtnId}" checked>
            <label class="form-check-label" for="${toggleBtnId}">
                ${shapes[i].svg}
                ${shapes[i].name}
            </label>
        </div>
        `;
    }

    // create checkboxes for nitrate level 
    for (let i = 0; i < colors.length; i++) {
        let toggleBtnId = `nitrate-level-${colors.name}`;
        nitrateToggleBtns.push(toggleBtnId);
        nitrate.innerHTML += /*html*/
        `
        <div class="form-check" style="padding-bottom: 10px;">
            <input class="form-check-input checkbox-input" type="checkbox" value="${toggleBtnId}" id="${toggleBtnId}" checked>
            <label class="form-check-label" for="${toggleBtnId}">
                <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 34 34">
                    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="${colors[i].hex}" stroke="black" stroke-width="1" rx="4" ry="4"/>
                </svg>
                ${colors[i].range}
            </label>
        </div>
        `;
    }
} 
