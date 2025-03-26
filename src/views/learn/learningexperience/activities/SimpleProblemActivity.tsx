import {SimpleProblemActivity} from "src/services/types";
import {Container, Typography} from "@mui/material";
import React from "react";

interface SimpleProblemActivityComponentProps {
    activity: SimpleProblemActivity;
}

export default function SimpleProblemActivityComponent(props: SimpleProblemActivityComponentProps) {
    let activity = props.activity;
    return (
        <Container maxWidth={"md"}>
            <Typography>{activity.introductionText}</Typography>
            <hr/>
            <Typography variant={"h5"}>{activity.problemText}</Typography>
        </Container>
    );
}