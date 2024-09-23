import { useTheme } from '@emotion/react';
import React from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from 'recharts';

export default function TinyLineChart({ strokeColor, lineDataKeyName, axisDataKeyName, data }) {
    const theme = useTheme();
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}>
                <XAxis dataKey={axisDataKeyName} />
                <Tooltip/>
                <Line type="bump" dataKey={lineDataKeyName} stroke={strokeColor} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};