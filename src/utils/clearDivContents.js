/* 
clearDivContents.js 
Description: Removes existing child components from a given HTML div element 
*/

export function clearDivContents(element) {
    const reset = document.getElementById(element);
    // reset.replaceChildren();
    reset.innerHTML = "";
}