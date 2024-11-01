import React from 'react';
import {SvgIcon} from "@mui/material";

/**
 * Element for icon of svg present in assets/svg/user.svg
 * @returns JSX element for distributed learning icon
 */
export default function CheckDoodleIcon(params: CustomIconProps) {
    return (
        <SvgIcon sx={{color: params.color, height: params.height, width: params.width}} htmlColor={params.color}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M341 67C148.339 290.671 183.5 343.046 131 205.023" stroke="#000000" stroke-opacity="0.9"
                      stroke-width="16" stroke-linecap="round"/>
                <path
                    d="M126.678 74.6892C175.762 40.3656 223.672 30.3765 275.706 57.7602C415.664 131.409 354.622 382.384 180.329 356.983C85.4278 343.149 -9.51278 223.621 90.9151 117.034"
                    stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
        </SvgIcon>
    );
}