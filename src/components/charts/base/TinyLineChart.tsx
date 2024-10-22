import React from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from 'recharts';

// Define the types for the props
interface TinyLineChartProps {
    strokeColor: string;
    lineDataKeyName: string;
    axisDataKeyName: string;
    data: Array<{ [key: string]: number | string }>;  // Array of objects with dynamic key names
}

const TinyLineChart: React.FC<TinyLineChartProps> = ({ strokeColor, lineDataKeyName, axisDataKeyName, data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={300}
                height={100}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey={axisDataKeyName} />
                <Tooltip />
                <Line type="bump" dataKey={lineDataKeyName} stroke={strokeColor} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TinyLineChart;