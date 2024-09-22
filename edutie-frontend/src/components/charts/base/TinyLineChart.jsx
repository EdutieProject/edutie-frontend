import { useTheme } from '@emotion/react';
import React from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

export default function TinyLineChart({strokeColor, dataKeyName, data}) {
    const theme = useTheme();
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Tooltip />
                <Line type="monotone" dataKey={dataKeyName} stroke={strokeColor} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};