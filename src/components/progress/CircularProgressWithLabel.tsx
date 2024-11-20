import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Heading from "../global/Heading";

declare module '@mui/material/CircularProgress' {
    interface CircularProgressPropsColorOverrides {
        accentFirst: true;
        accentSecond: true;
    }
}

export default function CircularProgressWithLabel(
    props: CircularProgressProps & { label: string; color?: string },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props}  />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Heading
                    variant="body1"
                    sx={{ textShadow: "1px 1px 0px white, -1px -1px 0px white, 0px 1px 0px white, 1px 0px 0px white" }}
                >{props.label}</Heading>
            </Box>
        </Box>
    );
}