import { SvgIcon } from "@mui/material";

//Custom icon representing assets/svg/distributed-learning.png

/**
 * Element for icon of svg present in assets/svg/distributed-learning.svg
 * @param {import("@mui/material").SvgIconProps} params 
 * @returns JSX element for distributed learning icon
 */
export default function DistributedLearningIcon(params) {
    return (
        <SvgIcon sx={{color: params.color, height: params.height, width: params.width}} htmlColor={params.color}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={params.color} viewBox="0 0 64 64" id="distributed-learning">
                <path d="M31.553,23.105l-12,6a1,1,0,0,0,0,1.79L21,31.618V36h2V32.618l2,1V38a1,1,0,0,0,.445.832l.5.336a10.909,10.909,0,0,0,12.1,0l.5-.336A1,1,0,0,0,39,38V33.618L44.447,30.9a1,1,0,0,0,0-1.79l-12-6A1,1,0,0,0,31.553,23.105ZM37,37.465l-.059.039a9.051,9.051,0,0,1-9.882,0L27,37.465V34.618L31.553,36.9a1,1,0,0,0,.894,0L37,34.618Zm-5-2.583L22.236,30,32,25.118,41.764,30Z"></path>
                <path d="M58,27a5.009,5.009,0,0,0-4.9,4H48.949a16.9,16.9,0,0,0-4.26-10.275l4.558-4.558a5.015,5.015,0,1,0-1.414-1.414l-4.558,4.558A16.9,16.9,0,0,0,33,15.051V10.9a5,5,0,1,0-2,0v4.152a16.9,16.9,0,0,0-10.275,4.26l-4.558-4.558a5.015,5.015,0,1,0-1.414,1.414l4.558,4.558A16.9,16.9,0,0,0,15.051,31H10.9a5,5,0,1,0,0,2h4.152a16.9,16.9,0,0,0,4.26,10.275l-4.558,4.558a5.015,5.015,0,1,0,1.414,1.414l4.558-4.558A16.9,16.9,0,0,0,31,48.949V53.1a5,5,0,1,0,2,0V48.949a16.9,16.9,0,0,0,10.275-4.26l4.558,4.558a5.015,5.015,0,1,0,1.414-1.414l-4.558-4.558A16.9,16.9,0,0,0,48.949,33H53.1A5,5,0,1,0,58,27ZM6,35a3,3,0,1,1,3-3A3,3,0,0,1,6,35ZM52,9a3,3,0,1,1-3,3A3,3,0,0,1,52,9ZM29,6a3,3,0,1,1,3,3A3,3,0,0,1,29,6ZM12,15a3,3,0,1,1,3-3A3,3,0,0,1,12,15Zm0,40a3,3,0,1,1,3-3A3,3,0,0,1,12,55Zm23,3a3,3,0,1,1-3-3A3,3,0,0,1,35,58Zm17-9a3,3,0,1,1-3,3A3,3,0,0,1,52,49ZM32,47A15,15,0,1,1,47,32,15.017,15.017,0,0,1,32,47ZM58,35a3,3,0,1,1,3-3A3,3,0,0,1,58,35Z"></path>
            </svg>
        </SvgIcon>
    );
}