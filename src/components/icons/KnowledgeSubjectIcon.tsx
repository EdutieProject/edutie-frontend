import {DocumentScanner, JoinFull, LensBlur, LightbulbCircle, PanoramaPhotosphere} from "@mui/icons-material";
import React from "react";
import {SvgIconProps} from "@mui/material";


export default function KnowledgeSubjectIcon(props: SvgIconProps) {

    const a = () => <LensBlur/>
    const b = () => <JoinFull/>
    const c = () => <LightbulbCircle/>

    return <DocumentScanner {...props} />
}