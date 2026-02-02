/* 
Parameter: sig = (string) value that signifies specific color 
Return: c = (string) color value in hex format 
*/

export function getColors(sig) {

    const colors = [
        {
            name: "orange",
            hex: "#FFAA00",
            range: "<= 5"
        },
        {
            name: "black",
            hex: "#000000",
            range: "<= 4"
        },
        {
            name: "blue",
            hex: "#7A8EF5",
            range: "<= 3"
        },
        {
            name: "light-blue",
            hex: "#73DFFF", 
            range: "<= 2"
        },
        {
            name: "red",
            hex: "F50000", 
            range: "> 5"
        }
    ]

    var c; 

    if (sig > 5) {
        c = colors[4].hex;
    } else {
        if (sig == 5) {
            c = colors[0].hex;
        } else if (sig == 4) {
            c = colors[1].hex;
        } else if (sig == 3) {
            c = colors[2].hex;
        } else {
            c = colors[3].hex;
        }
    }

    return c; 
}

export function colorMsg() {
    console.log("This is from getColor()")
}

export const colorText = "This is from getColor()"