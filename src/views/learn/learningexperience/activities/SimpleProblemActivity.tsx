import {SimpleProblemActivity} from "src/services/types";
import {Container, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Editor from "src/components/editors/Editor";
import {OutputData} from "@editorjs/editorjs";

const solutionTemplateEditorData: OutputData = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Approach",
                "level": 3
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Describe your approach on the problem"
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Solution",
                "level": 3
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Here goes your solution"
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Conclusion",
                "level": 3
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Conclude your solution",
            }
        },
    ]
}


interface SimpleProblemActivityComponentProps {
    activity: SimpleProblemActivity;
}

export default function SimpleProblemActivityComponent(props: SimpleProblemActivityComponentProps) {
    const [solution, setSolution] = useState<OutputData>(solutionTemplateEditorData);


    let activity = props.activity;
    return (
        <Container maxWidth={"md"}>
            <Typography>{activity.introductionText}</Typography>
            <hr/>
            <Typography variant={"h5"}>{activity.problemText}</Typography>
            <Editor currentContent={solution} setCurrentContent={setSolution}/>
        </Container>
    );
}