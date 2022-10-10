var localStorage;

fetch('./static/data/data3.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('wellData', JSON.stringify(data))
        // console.log(localStorage.getItem('wellData'));
        // console.log('This is from read.js:');
        // console.log(JSON.stringify(data));
    })
    .catch(console.error);

const well = { 
    "Name": "A-1",
    "Location": {
        "Lat": 13.45409,
        "Lon": 144.7594,
        "Basin": "Hagatna"},
    "Stats": {
        "Average": 1.47490566,
        "Min": 0.65,
        "Max": 3.1,
        "Mode": 1.3,
        "Slope": 0.0000210396,
        "Intercept": 0.717126208,
        "Std_Dev": 0.421816687,
        "Deg_of_Free": 51,
        "Rcrit": 0.2706,
        "Rcalc_Mo": 0.413461739,
        "Rcalc_New": 0.181079821,
        "EA": 0.414843384,
        "EA_X2": 0.829686767,
        "Base_Year": "1/1/86",
        "End_Year": "1/1/20",
        "Top1": 0.829686767,
        "Top2": 0.829686767,
        "Bottom1": 0.963200948,
        "Bottom2": 1.224471162,
        "Inc_10_Yrs": 0.076794676,
        "Inc_20_Yrs": 0.153589352,
        "X_Yrs_1ppm": 130.2173607,
        "Sig": 0,
        "MoP": 0,
        "Annual_Freq": 1.261904762},
    "Plot": {
        "X": [2015,2016,2017,2018,2019,2020],
        "Y": [1,2,3,4,5,6]}
}

console.log(typeof localStorage); 

// Shows the properties of the JSON file (or JS object)
function getDeepKeys(obj) {
    var keys = [];
    for(var key in obj) {
        keys.push(key);
        if(typeof obj[key] === "object") {
            var subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map(function(subkey) {
                return key + "." + subkey;
            }));
        }
    }
    return keys;
}

// console.log(getDeepKeys(well));