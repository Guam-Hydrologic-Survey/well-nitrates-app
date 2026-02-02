/* 
SidePanel.js
Parameters: "data" - specific point's data, namely target.point.feature.properties from the JSON file 
Return: None. 
Function: Adds inner HTML code for statistical information and time series plot to existing #side-panel element. 
*/

// components 
import { getStats } from "./Stats.js"
import { getPlot } from "./Plot.js"

export function SidePanel(data) { 
  
    const sidePanelId = "more-info-offcanvas";

    document.getElementById("side-panel").innerHTML = /*html*/
    `
    <div class="offcanvas offcanvas-start offcanvas-size-xl rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="${sidePanelId}" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body" id="side-panel-content">
        <div id="stats-content"></div>
        <br><br>
        <h5>Nitrate-N Levels</h5>
        <hr>
        <div id="plot-content"></div>
        <br><br><br><br>
      </div>

    </div>
    `;

    getStats(data, "stats-content");
    getPlot(data, "plot-content");

    // functionality and visibilty for side panel offcanvas 
    const sidepanel = document.getElementById(sidePanelId);
    const sidepanelOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidepanel);
    sidepanelOffcanvas.show();
};
