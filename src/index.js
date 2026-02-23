/* 
index.js 
Description: Entry point for project. Appends all components to #app in index.html. 
*/

// components 
import { About } from "./components/About.js";
import { FullscreenModal } from "./components/FullscreenModal.js";
import { NavBar } from "./components/NavBar.js";
import { Legend } from "./components/Legend_v2.js";
import { LMap } from "./components/LMap_v2.js";
import { LargePlotModal } from "./components/Plot.js";

document.getElementById("app").innerHTML = /*html*/ 
`
    <div id="nav-bar"></div>
    <div id="map"></div>
    <div id="info"></div>
    <div id="notif"></div>
    <div id="multiple-plots"></div>
    <div id="side-panel"></div>
    <div id="legend"></div>
    <div id="large-plot"></div>
    <div id="selection-view"></div>
`

NavBar(document.getElementById("nav-bar"));
About(document.getElementById("info"));
FullscreenModal(document.getElementById("multiple-plots"));
Legend(document.getElementById("legend"));
LargePlotModal(document.getElementById("large-plot"));
LMap(document.getElementById("map"));