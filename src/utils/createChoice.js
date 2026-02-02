/* 
createChoice.js
Parameters: 
    name - expects a string value containing the well name/point 
    status - a boolean value (true or false) that determines if the choice is checked or not 
Return: 
*/

export function createChoice(name, status) {
    return {
        name: name,
        checked: status,
    };
}