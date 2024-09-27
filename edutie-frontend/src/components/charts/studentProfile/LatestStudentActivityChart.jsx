import { useTheme } from "@mui/material";
import TinyLineChart from "../base/TinyLineChart";

export default function LatestStudentActivityChart({data}) {
    const theme = useTheme();
    console.log(data);

    return (
        <TinyLineChart
            lineDataKeyName={"zadania"}
            axisDataKeyName={"dayName"}
            strokeColor={theme.palette.primary.dark} data={data}
        />
    )
}