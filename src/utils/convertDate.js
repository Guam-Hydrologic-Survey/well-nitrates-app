/* 
Parameter: oldDates = (array) list of dates in MM/DD/YYYY format; each element is a string 
Return: newDates = (array) list of new dates as a JS date object 
*/

export function convertDate(oldDates) {
    const newDates = [];

    for (let i = 0; i < oldDates.length; i++) {
        newDates[i] = new Date(oldDates[i]); 
    }

    return newDates;
}

export function dateMsg() {
    console.log("This is from convertDate()")
}

export const dateText = "This is from convertDate()"