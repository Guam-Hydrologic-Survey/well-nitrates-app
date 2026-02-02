/*
Plot.js
Exports: getPlot(data, element), Plot(data, element), MultiplePlots(selection, element), LargePlotModal(element)
Parameters: (general)
    "data" - JSON data (specifically "feature.properties" from fetch method in LMap.js) containing x- and y-values for plot
    "element" - HTML element with ID for plot container
Notes: Detailed function descriptions (discussion of parameters and return values included) are documented throughout code body.
*/

// utilities
import { convertDate } from "../utils/convertDate.js";

// globals
let x_data = "";
let y_data = "";

let trace = {
    // replace with x and y data from JSON file
    x: x_data,
    y: y_data,
    type: 'scatter',
    mode: 'markers',
    name: 'Plot Title',
};

// array to contain plot traces
let dataValues = [];

let selectorOptions = {
    buttons: [{
        step: 'year',
        stepmode: 'backward',
        count: 1,
        label: '1y'
    }, {
        step: 'year',
        stepmode: 'backward',
        count: 5,
        label: '5y'
    }, {
        step: 'year',
        stepmode: 'todate',
        count: 10,
        label: '10y'
    }, {
        step: 'year',
        stepmode: 'backward',
        count: 20,
        label: '20y'
    },
    {
        step: 'year',
        stepmode: 'backward',
        count: 30,
        label: '30y'
    },
    {
        step: 'year',
        stepmode: 'backward',
        count: 40,
        label: '40y'
    },
    {
        step: 'year',
        stepmode: 'backward',
        count: 50,
        label: '50y'
    },
    {
        step: 'all',
    }],
};

// plot layout options; customize in Plot()
let layout = {
    autosize: true,
    // height: 500,
    // width: 380,
    title: {
        text: "",
        font: {
            size: 20
        },
        xref: 'paper',
        x: 0.05,
        xanchor: 'center'
    },
    xaxis: {
        title: "Title for X-Values",
        rangeselector: selectorOptions,
        rangeslider: {}
    },
    yaxis: {
        title: "Title for Y-Values",
        fixedrange: true
    }
};

// custom icon for plot modebar buttons
let icon1 = {
    width: 500,
    height: 600,
    path: "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"
}

// plot configuration options; customize in Plot()
let config = {
    scrollZoom: true,
    displaylogo: false,
    responsive: true,
    modeBarButtonsToAdd: [
        {
          name: "Download plot as png",
          icon: Plotly.Icons.camera,
          click: () => {
            Plotly.downloadImage(element, {format: 'png', width: 1500, height: 1000, filename: 'well_plot'});
          }},
        ],
    modeBarButtonsToRemove: ["lasso2d", "select2d", "toImage"]
};

/*
Function: getPlot()
Parameters:
    "data" - JSON data (specifically "feature.properties" from fetch method in LMap.js) containing x- and y-values for plot
    "element" - HTML element to append generated plot svg
Return: none
Notes: Because of the reserve word, "export," this function is available to other components within the project.
*/
export function getPlot(data, element) {
    resetLayout();
    Plot(data, element);

    // update contents of large-plot-container
    const largePlotTitle = `Nitrate-N Levels for Well ${data.name}`;
    document.getElementById("large-plot-container-title").innerHTML = `<span style="font-size: 26px; font-weight: 700; text-align: center;">${largePlotTitle}</span>`;
    largePlot(data, "large-plot-container-body");

    const enlargePlotBtn = document.createElement("div");
    enlargePlotBtn.classList.add('plot-btn-container');
    enlargePlotBtn.innerHTML = /* html */
    `
    <button type="button" data-bs-toggle="modal" data-bs-target="#large-plot-container" class="btn btn-primary" id="enlarge-plot">
            <i class="bi bi-arrows-angle-expand"></i> Enlarge plot
    </button>
    `;

    document.getElementById(element).appendChild(enlargePlotBtn);
}

/*
Function: setPlotData()
Parameters: "data" - JSON data (specifically "feature.properties" from fetch method in LMap.js) containing x- and y-values for plot
Return: none
*/
function setPlotData(data) {
    // updates arrays with values
    y_data = data.y_vals;
    x_data = convertDate(data.x_vals);

    // updates trace with newly assigned values
    trace.x = x_data;
    trace.y = y_data;
    trace.title = `Plot for Well ${data.name}`;

    // clear array contents
    dataValues = [];
    dataValues.push(trace);
}

/*
Function: setLayout()
Parameters: "data" - JSON data (specifically "feature.properties" from fetch method in LMap.js) containing x- and y-values for plot
Return: none
*/
function setLayout(data) {
    // file name for export
    // config.toImageButtonOptions.filename += `${data.name}`;

    // configurations
    layout.title = `Well ${data.name}`;
    layout.xaxis.title = " ";
    layout.yaxis.title = "Nitrate-N Levels";
}

/*
Function: resetLayout()
Parameters: none
Return: none
Description: Resets all the attributes for layout to the original/default values.
*/
function resetLayout() {
    layout = {
        autosize: true,
        // height: 500,
        // width: 380,
        title: {
            text: "",
            font: {
                size: 20
            },
            xref: 'paper',
            x: 0.05,
            xanchor: 'center'
        },
        xaxis: {
            title: "Title for X-Values",
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            title: "Title for Y-Values",
            fixedrange: true
        }
    };
}

/*
Function: Plot()
Parameters:
    "data" - JSON data (specifically "feature.properties" from fetch method in LMap.js) containing x- and y-values for plot
    "element" - HTML element with ID for the plot container (i.e., where the plot will be appended)
Notes: Because of the reserve word, "export," this function is available to other components within the project.
*/
export function Plot(data, element) {

    resetLayout();
    setPlotData(data);

    // updates arrays with values
    // y_data = data.y_vals;
    // x_data = convertDate(data.x_vals);

    // config.toImageButtonOptions.filename += `${data.name}`;

    layout.title.text = `Well ${data.name}`;
    layout.xaxis.title = " ";
    layout.xaxis.rangeselector = " ";
    layout.yaxis.title = "Nitrate-N Levels";

    // updates trace with newly assigned values
    // trace.x = x_data;
    // trace.y = y_data;
    // trace.title = `Plot for Well ${data.name}`;

    Plotly.newPlot(element, dataValues, layout, {
        scrollZoom: true,
        displaylogo: false,
        responsive: true,
        modeBarButtonsToAdd: [
            {
            name: "Download plot as png",
            icon: Plotly.Icons.camera,
            // icon: icon1,
            click: () => {
                Plotly.downloadImage(element, { format: 'png', width: 1000, height: 800, filename: `well_${data.name}_plot` });
            }},
            ],
        modeBarButtonsToRemove: ["lasso2d", "select2d", "toImage"]
    });
};

/*
Function: MultiplePLots()
Parameters:
    "selection" - array list containing selected objects
    "element" - parent HTML element to insert generated plots for multi-plot view
    "method" - a string; dictates what method of selection was used 
Return: none
Notes: Because of the reserve word, "export," this function is available to other components within the project.
*/
export function MultiplePlots(selection, element, method) {
    let plot = "";
    if (method === "lasso") {
        for (let i = 0; i < selection.length; i++) {
            const well = selection[i].feature.properties;
            const id = `well-${well.name}`;
            plot = `<div class="selected-well" id="${id}"></div>`;
            element.insertAdjacentHTML("beforeend", plot);
            Plot(well, id);
        }
    } else {
        for (let i = 0; i < selection.length; i++) {
            const well = selection[i];
            const id = `well-${well.name}`;
            plot = `<div class="selected-well" id="${id}"></div>`;
            element.insertAdjacentHTML("beforeend", plot);
            Plot(well, id);
        }

        // open multiple plot view modal 
        const plotModal = document.getElementById("multi-plot-view");
        const viewPlotModal = bootstrap.Modal.getOrCreateInstance(plotModal);
        viewPlotModal.show();
    } 
}

/*
Function: LargePlotModal()
Parameters: "element" - HTML element with ID to contain the BS UI element, modal
Return: none
*/
export function LargePlotModal(element) {
    element.innerHTML = /* html */
    `
    <div class="modal fade" id="large-plot-container" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="large-plot-container-title">Enlarged Plot</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="large-plot-container-body">
            <div id="enlarged-plot"></div>
          </div>
        </div>
      </div>
    </div>
    `;
}

/*
Function: largePLot()
Parameters:
    "data" - JSON data (specifically "feature.properties" from fetch method in LMap.js) containing x- and y-values for plot
    "element" - HTML element with ID for the plot container (i.e., where the plot will be appended)
Return: none
*/
function largePlot(data, element) {

    y_data = data.y_vals;
    x_data = convertDate(data.x_vals);

    // config.toImageButtonOptions.filename += `${data.name}`;

    layout.title.text = `Well ${data.name}`;
    layout.xaxis.title = " ";
    layout.xaxis.rangeselector = `${selectorOptions}`;
    layout.yaxis.title = "Nitrate-N Levels";

    layout.height = 600;
    layout.width = 1100;

    // updates trace with newly assigned values
    trace.x = x_data;
    trace.y = y_data;
    trace.title = `Plot for Well ${data.name}`;

    Plotly.newPlot(element, [trace], layout,
        {
            scrollZoom: true,
            responsive: true,
            displaylogo: false
        },
        {
            responsive: true
        })
};