/*
MarkerIcon.js
*/

import { getColors } from "../utils/getColor.js";

const height = 100;
const width = 100;

const shapes = [
    {
        name: "Increasing",
        sig_lvl: 1,
        svg: `<svg height="${height}" width="${width}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <title>Significantly Increasing</title>
                        <g fill="#d9d9d9" stroke="black">
                            <path stroke-width="4" d="M50 0 L0 100 L100 100 Z"></path>
                        </g>
                    </svg>`
    },
    {
        name: "Insignificant",
        sig_lvl: 0,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24">
        <title>Insignificant</title>
        <circle cx="12" cy="12" r="10" fill="#d9d9d9" stroke="black" stroke-width="1"/></svg>`
    },
    {
        name: "Decreasing",
        sig_lvl: -1,
        svg: `<svg height="${height}" width="${width}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <title>Significantly Decreasing</title>
                                    <g fill="#d9d9d9" stroke="black">
                                        <path stroke-width="4" d="M0 0 L50 100 L100 0 Z"></path>
                                    </g>
                                </svg>`
    }
];

export function MarkerIcon(point) {
    let iconStyle;

    if (point.sig == 1) {
        // get shape and then determine color for each case
        iconStyle = `
        <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g fill="${getColors(feature.properties.LTG2019)}" stroke="black">
                <path stroke-width="5" d="M50 0 L0 100 L100 100 Z"></path>
            </g>
        </svg>
        `;
    } else if (point.sig == -1) {
        iconStyle = `
        <svg height="100%" width="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g fill="${getColors(feature.properties.LTG2019)}" stroke="black">
                <path stroke-width="5" d="M0 0 L50 100 L100 0 Z"></path>
            </g>
        </svg>
        `
    } else {
        // just created a circle icon here, but maybe use svg instead 
    }

    return iconStyle;
}