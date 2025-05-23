import React from "react";
import {SvgIcon} from "@mui/material";

/**
 * Element for icon of svg present in assets/svg/books-literature-svgrepo-com.svg
 * @returns JSX element for distributed learning icon
 */
export default function LightBulbDoodleIcon(params: CustomIconProps) {
    return (
        <SvgIcon sx={{color: params.color, height: params.height, width: params.width}} htmlColor={params.color}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M170.775 263.266C45.3695 89.9489 351.415 57.2556 235.074 265" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M223.927 294.786C208.714 303.727 197.077 301.397 183.349 292.717" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M223.931 323.947C209.382 329.705 191.961 332.227 179.771 321.113" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.503384" d="M200.609 264.023C205.622 256.118 213.14 177.545 195.739 180.506C177.592 183.597 183.172 214.637 200.609 217.109C230.615 221.366 231.089 172.082 212.779 191.558C204.814 200.032 202.007 211.527 194.927 220.563" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.503384" d="M216.241 90.0703C218.01 84.0801 217.416 77.9769 218.486 72" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.503384" d="M146.354 105.559C143.63 101.989 141.597 97.8004 139.193 93.9424" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.503384" d="M112.935 173.969C108.795 172.811 104.705 171.16 101 168.806" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.503384" d="M271.67 121.048C275.349 119.093 278.89 116.852 282.411 114.595" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.503384" d="M283.009 191.451C288.327 192.179 293.385 190.905 298.524 189.832" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </SvgIcon>
    );
}