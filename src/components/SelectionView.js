/* 
SelectionView.js
Parameters: "element" - HTML element with ID for selection view left side panel offcanvas 
Return: none
*/

// components 
import { MultiplePlots } from "./Plot.js";
import { pointSelectBtn } from "./LMap.js";

// utils 
import { clearDivContents } from "../utils/clearDivContents.js";

let choices = [];
let choicesLayers = [];
let finalSelection = [];

export { choices, choicesLayers, finalSelection };

/* 
Function: SelectionView()
Parameter: "selection" - HTML element to append to 
Return: none 
Description: Creates left side panel offcanvas to show the user their current selection 
*/
export function SelectionView(selection) {

    const selectionViewId = "selection-view-offcanvas";

    document.getElementById("selection-view").innerHTML = /*html*/
    `
    <div class="offcanvas offcanvas-start offcanvas-size-xl rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="${selectionViewId}" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false" data-bs-animation="slide-in-left">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" id="click-selection-close-btn" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body">
        <h4><img src="./src/assets/hand-index-thumb-fill.svg"> Selection in progress...</h4>
        <p style="font-style: italic;">Click on points from th map to add to selection.</p>
        <hr/>
        <div id="selection-view-list"></div>
        <br>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-outline-danger" type="button" id="selection-view-clear-btn">Clear selection</button>
            <button class="btn btn-outline-success" type="button" id="selection-view-select-all-btn">Select all</button>
            <button class="btn btn-outline-primary" type="button" id="selection-view-plot-btn">Plot selection</button>
        </div>
      </div>

    </div>
    `;

    // functionality and visibilty for side panel offcanvas 
    const selectionView = document.getElementById(selectionViewId);
    const selectionViewOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(selectionView);
    selectionViewOffcanvas.show();

    // functionality for item checkbox on change 
    document.getElementById("selection-view-list").onchange = function(e) {
      if (!e.target.checked) {
        for (let i =0; i < choicesLayers.length; i++) {
          if (e.target.value == choicesLayers[i].name) {
            choicesLayers.splice(i, 1);
            break;
          }
        }
      }
    }

    const closeSelectionView = document.getElementById("click-selection-close-btn");
    closeSelectionView.addEventListener("click", () => {
      // turn off click to select points buttons 
      pointSelectBtn.state("detrigger-pointSelectBtn");
      
      // clear plot contents 
      document.getElementById("multi-plot-view-contents").replaceChildren();
    })

    // functionality for "select all" option 
    const selectAll = document.getElementById("selection-view-select-all-btn");
    selectAll.addEventListener("click", () => {
      selectAllPoints();
    });

    // functionality for "clear all" option 
    const clearAll = document.getElementById("selection-view-clear-btn");
    clearAll.addEventListener("click", () => {
      clearSelection();
    });

    const plotChecked = document.getElementById("selection-view-plot-btn");
    plotChecked.addEventListener("click", () => {
      plotSelection();
    })
}

// creates checkbox for each point selected; called in fetch during "click" event on map layer 
export function createCheckBox(label) {
  let radio = /* html */
  `
  <div class="form-check">
    <input class="form-check-input point-click-select" type="checkbox" value="${label}" id="${label}" checked>
    <label class="form-check-label" for="${label}">${label}</label>
  </div>
  `;

  document.getElementById("selection-view-list").insertAdjacentHTML("beforeend", radio);
}

// sets checkbox input attribute checked to true 
function selectAllPoints() {
  // let checkboxes = document.getElementsByTagName("input");
  let checkboxes = document.getElementsByClassName("point-click-select");
  for (let i = 0; i < checkboxes.length; i++) {
    let choice = checkboxes[i];
    if (!choice.checked) {
      choice.checked = true; 
      choice.setAttribute("checked", "");
    }
  }
}

// sets checkbox input attribute checked to false 
function clearSelection() {
  let checkboxes = document.getElementsByClassName("point-click-select");
  for (let i = 0; i < checkboxes.length; i++) {
    let choice = checkboxes[i];
    if (choice.checked) {
      choice.checked = false; 
      choice.removeAttribute("checked");
    }
  }
  
  // reset the array 
  finalSelection = [];

  // clear plots from view 
  clearDivContents("multi-plot-view-contents");
}

function plotSelection() {
  MultiplePlots(choicesLayers, document.getElementById("multi-plot-view-contents"), "click");
}
