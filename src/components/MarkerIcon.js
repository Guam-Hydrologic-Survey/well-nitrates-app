/*
MarkerIcon.js
*/

import { getColors } from "../utils/getColor.js";

export function MarkerIcon(point) {
    let iconStyle;

    if (point.sig == 1) {
        iconStyle = L.divIcon({
                    html: `
                    <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g fill="${getColors(point.LTG2019)}" stroke="black">
                            <path stroke-width="5" d="M50 0 L0 100 L100 100 Z"></path>
                        </g>
                    </svg>
                    `,
                    className: "",
                    iconSize: [18, 18]
                });
    } else if (point.sig == -1) {
        iconStyle = L.divIcon({
                        html: `
                        <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g fill="${getColors(point.LTG2019)}" stroke="black">
                                <path stroke-width="5" d="M0 0 L50 100 L100 0 Z"></path>
                            </g>
                        </svg>
                        `,
                        className: "",
                        iconSize: [18, 18]
                    });
    } else {
        iconStyle = L.divIcon({
            html: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <title>Insignificant</title>
        <circle cx="12" cy="12" r="10" fill="${getColors(point.LTG2019)}" stroke="black" stroke-width="1"/></svg>`,
            className: "",
            iconSize: [18, 18]
        })
    }

    return iconStyle; 
}