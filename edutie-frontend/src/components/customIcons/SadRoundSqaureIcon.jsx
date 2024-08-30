import { SvgIcon } from "@mui/material";

/**
 * Icon element - not present in assets.
 * @param {import("@mui/material").SvgIconProps} params 
 * @returns JSX element for distributed learning icon
 */
export default function SadRoundSquareIcon(params) {
    return (
        <SvgIcon sx={{ color: params.color, height: params.height, width: params.width }} htmlColor={params.color}>
            <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.868 104C10.8012 104 5 98.1986 5 71.132" stroke="#323232" stroke-width="10" stroke-linecap="round" />
                <path d="M104 71.132C104 98.1986 98.1986 104 71.132 104" stroke="#323232" stroke-width="10" stroke-linecap="round" />
                <path d="M71.132 5C98.1986 5 104 10.8012 104 37.868" stroke="#323232" stroke-width="10" stroke-linecap="round" />
                <path d="M32.5001 76.5C37.5172 69.8208 45.5048 65.5 54.5023 65.5C63.4992 65.5 71.4868 69.8208 76.5039 76.5" stroke="#323232" stroke-width="10" stroke-linecap="round" />
                <path d="M37.9999 43.561V43.5" stroke="#323232" stroke-width="10" stroke-linecap="round" />
                <path d="M71.0001 43.561V43.5" stroke="#323232" stroke-width="10" stroke-linecap="round" />
                <path d="M5 37.868C5 10.8012 10.8012 5 37.868 5" stroke="#323232" stroke-width="10" stroke-linecap="round" />
            </svg>

        </SvgIcon>
    );
}