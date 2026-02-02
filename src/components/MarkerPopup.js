/* 
MarkerPopup.js 
Parameters: 
    "name" - string, location name; 
    "loc" - string, either village, basin, or watershed; 
    "lat" - numerical value for lattitude coordinate; 
    "lon" - numiercal value for longitude coordinate
Return: "content" - a string constant containing HTML code for the BS UI element, card, through template literals 
Notes: can adjust parameters, if needed (i.e., remove lat lon coordinates, add different attributes to display)
*/

export function MarkerPopup(name, loc, lat, lon) {
    const content = /*html*/
    `
    <div class="marker-pop-up card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${name}, ${loc}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${lat}, ${lon}</h6>
            <p class="card-text"></p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#more-info-offcanvas" aria-controls="offcanvasWithBothOptions" onclick="" id="marker-more-info">More Info</button>
            </div>
        </div>
    </div>
    `
    return content;
}