import {JoinFull, LensBlur, LightbulbCircle, PanoramaPhotosphere} from "@mui/icons-material";
import React from "react";
import {SvgIconProps} from "@mui/material";


export default function LearningSubjectIcon(props: SvgIconProps) {

    const a = () => <LensBlur/>
    const b = () => <JoinFull/>
    const c = () => <LightbulbCircle/>

    return <LightbulbCircle {...props} />
}