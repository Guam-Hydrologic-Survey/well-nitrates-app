/* 
FullscreenModal.js 
Parameters: "element" - HTML element with ID for modal 
Return: none
*/

import { clearDivContents } from "../utils/clearDivContents.js";

export function FullscreenModal(element) {

    element.innerHTML = /*html*/
    `
    <div class="modal fade" id="multi-plot-view" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                
                <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Plots for Select Points</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" id="close-plot-selection" aria-label="Close"></button>
                </div>

                <!-- Selected plots will be appended here -->
                <div class="modal-body">
                    <div id="multi-plot-view-contents"></div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal" id="select-more-points">Select more points to plot</button>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" id="clear-plot-selection">Close & clear plot selection</button>
                </div>
            </div>
        </div>
    </div>
    `;

    const clearSelection = document.getElementById("clear-plot-selection");
    clearSelection.addEventListener("click", (event) => {
        clearDivContents("multi-plot-view-contents");
    })

    const closePlotSelection = document.getElementById("close-plot-selection");
    closePlotSelection.addEventListener("click", (event) => {
        clearDivContents("multi-plot-view-contents")
    })
};