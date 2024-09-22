import { useTheme } from "@mui/material";
import TinyLineChart from "../base/TinyLineChart";

export default function LatestStudentActivityChart() {
    const theme = useTheme();
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 24,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 12,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 222,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 2,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 412,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 33,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 22,
            amt: 2100,
        },
    ];

    return <TinyLineChart dataKeyName={"pv"} strokeColor={theme.palette.primary.dark} data={data} />
}