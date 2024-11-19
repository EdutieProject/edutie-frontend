import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import React from 'react';

declare module '@mui/material/LinearProgress' {
    interface LinearProgressPropsColorOverrides {
        accentFirst: true;
        accentSecond: true;
    }
}

export default function CustomLinearProgress(props: LinearProgressProps) {
    return <LinearProgress { ...props }/>;
}