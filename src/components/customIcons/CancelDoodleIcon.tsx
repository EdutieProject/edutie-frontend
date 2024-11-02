import React from 'react';
import {SvgIcon} from "@mui/material";

/**
 * Element for icon of svg present in assets/svg/user.svg
 * @returns JSX element for distributed learning icon
 */
export default function CancelDoodleIcon(params: CustomIconProps) {
    return (
        <SvgIcon sx={{color: params.color, height: params.height, width: params.width}} htmlColor={params.color}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M151.753 123.032C169.29 100.11 202.191 91.1034 229.394 94.9823C262.055 99.6471 293.584 131.236 301.141 167.913C343.948 375.598 14.3513 329.118 112.438 149.962"
                    stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round"
                    stroke-linejoin="round"/>
                <path d="M297.601 94.1099C235.716 164.124 178.571 238.859 112.609 305" stroke="#000000"
                      stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </SvgIcon>
    );
}