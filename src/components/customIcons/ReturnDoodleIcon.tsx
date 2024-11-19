import React from 'react';
import {SvgIcon} from "@mui/material";

/**
 * Element for icon of svg present in assets/svg/user.svg
 * @returns JSX element for distributed learning icon
 */
export default function ReturnDoodleIcon(params: CustomIconProps) {
    return (
        <SvgIcon sx={{color: params.color, height: params.height, width: params.width}} htmlColor={params.color}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M217.634 281C240.934 279.408 258.859 278.612 271.409 278.612C283.96 278.612 300.823 279.408 322 281L319.62 220.331L322 164.388C308.647 162.796 283.911 162 247.793 162C211.676 162 156.078 162.796 81 164.388"
                    stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round"
                    stroke-linejoin="round"/>
                <path
                    d="M131 118C109.03 133.027 92.4817 144.668 81.3551 152.922C70.2284 161.177 86.7767 183.202 131 219"
                    stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
        </SvgIcon>
    );
}