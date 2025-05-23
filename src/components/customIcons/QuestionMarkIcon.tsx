import React from 'react';
import {SvgIcon} from "@mui/material";

/**
 * Element for icon of svg present in assets/svg/user.svg
 * @returns JSX element for distributed learning icon
 */
export default function QuestionMarkIcon(params: CustomIconProps) {
    return (
        <SvgIcon sx={{color: params.color, height: params.height, width: params.width}} htmlColor={params.color}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M142 125.853C155.049 97.8883 180.62 82.7645 200.381 78.4757C227.189 72.6575 249.859 84.0511 257.624 112.528C260.302 122.352 259.217 138.128 253.081 148.517C247.426 158.092 239.904 165.942 227.555 176.481C225.251 178.447 217.389 185.018 216.649 185.643C199.849 199.818 191.567 209.152 186.81 220.972C182.053 232.792 182.305 269.489 216.649 266.35" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M198.744 315.68C198.744 317.274 198.744 319.614 198.744 322.7" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </SvgIcon>
    );
}