/*
roundDec.js
Parameter(s): "value" - string or numerical value from the statistics properties of the well/location 
Return: returns updated value ("newValue") with fixed amount of decimal places 
*/

export function roundDec(value) {
    let oldValue = value;
    let newValue;

    if (typeof value == "string") {
        if (value.includes("--") || value.length == 0 || containsOnlyWhitespace(value) || value == null) {
            return value;
        } else {
            newValue = Number(oldValue);
            return checkIfInteger(newValue);
        }
    } else {
        return checkIfInteger(value);
    }
}

// returns true if the string contains only white spaces 
function containsOnlyWhitespace(string) {
    return /^\s*$/ .test(string); 
}

function checkIfInteger(value) {
    // checks if int or float value using mod 
    if (value % 1 != 0) {
        // checks if it's <= 0.0001 or if there are many leading 0's
        if (value <= 0.001) {
            // converts to scientific notation 
            return value.toExponential(4);
        } else {
            return Number(value.toFixed(4));
        }
    } else {
        return value;
    }
} 