import { useTheme } from "@mui/material";
import TinyLineChart from "../base/TinyLineChart";
import React from "react";

interface LatestStudentActivityChartProps {
    data: Array<{ dayName: string; zadania: number }>;
}

export default function LatestStudentActivityChart({ data }: LatestStudentActivityChartProps) {
    const theme = useTheme();
    return (
        <TinyLineChart
            lineDataKeyName="zadania"
            axisDataKeyName="dayName"
            strokeColor={theme.palette.primary.dark}
            data={data}
        />
    );
}