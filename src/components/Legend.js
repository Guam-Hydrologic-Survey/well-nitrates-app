/* 
Legend.js
Parameters: "element" - HTML element with ID for legend left side panel offcanvas 
Return: none
*/

export function Legend(element) {
    element.innerHTML = /*html*/
    `
    <div class="offcanvas offcanvas-start offcanvas-size-sm rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="legend-offcanvas" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body">
        <!-- replace/update this section with legend values -->
        <h3>Legend</h3>
        <hr>
        <p>Increasing:</p>
        <img class="legend-img" src="./src/assets/Legend_Increasing.PNG" style="height: 140px;">
        <hr>
        <p>Insignificant:</p>
        <img class="legend-img" src="./src/assets/Legend_Insignificant.PNG" style="height: 200px;">
        <hr>
        <p>Decreasing:</p>
        <img class="legend-img" src="./src/assets/Legend_Decreasing.PNG" style="height: 80px;">
      </div>

    </div>
    `
}