import {
    ApiError,
    SimpleProblemActivity,
    SimpleProblemActivitySolutionSubmission,
    SolutionParagraph
} from "src/services/types";
import {Box, Button, Container, Typography} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Editor from "src/components/editors/Editor";
import {OutputData} from "@editorjs/editorjs";
import {createSimpleProblemActivityLearningResult} from "src/services/learning/learningResultService";
import {useNavigate} from "react-router";
import {navigationPath} from "src/features/navigation/navigationPath";

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

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sanitizeSimpleProblemSolution(solution: OutputData): SimpleProblemActivitySolutionSubmission {
    let solutionParagraphs: SolutionParagraph[] = [];
    solution.blocks.forEach((block, i) => {
        solutionParagraphs.push({
            id: `db1a215f-88d0-4622-${randomIntFromInterval(1000, 9999)}-f38b70ad13b6`,
            content: {textContentType: "SIMPLE_TEXT", text: block.data.text},
            ordinal: i
        })
    });
    //TODO: remove uuid manual mapping
    return {
        id: `a3e16577-619d-4321-${randomIntFromInterval(1000, 9999)}-1f214869868d`,
        learningType: "REMEMBER",
        solutionSubmissionType: "SimpleProblemActivitySolutionSubmission",
        solutionParagraphs: solutionParagraphs
    }
}


interface SimpleProblemActivityComponentProps {
    learningExperienceId: string;
    activity: SimpleProblemActivity;
    setLearningResultLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<ApiError | undefined>>;
    setCachedSolution: Dispatch<SetStateAction<OutputData | undefined>>;
    cachedSolution: OutputData | undefined;
}

export default function SimpleProblemActivityComponent(props: SimpleProblemActivityComponentProps) {
    const navigate = useNavigate();
    const [solution, setSolution] = useState<OutputData>(props.cachedSolution ?? solutionTemplateEditorData); //TODO: move this up so it does not disappear while moving contents

    async function handleCreateLearningResult() {
        props.setLearningResultLoading(true);
        const response = await createSimpleProblemActivityLearningResult(
            props.learningExperienceId, sanitizeSimpleProblemSolution(solution)
        );
        if (!response.success) {
            props.setError(response.error);
            return;
        }
        navigate(navigationPath.fillPath(navigationPath.learningResult, response.data.id), {state: {learningResult: response.data}})
    }

    useEffect(() => {
        props.setCachedSolution(solution);
    }, [solution]);

    let activity = props.activity;
    return (
        <Container maxWidth={"md"} sx={{pb: 16}}>
            <Typography>{activity.introductionText}</Typography>
            <hr/>
            <Typography variant={"h5"}>{activity.problemText}</Typography>
            <Editor currentContent={solution} setCurrentContent={setSolution}/>
            <Box sx={{
                position: "fixed",
                width: " 100%",
                left: 0,
                bottom: 150,
                display: "grid",
                placeItems: "center",
                zIndex: 50
            }}>
                <Button variant={"contained"} onClick={handleCreateLearningResult}>Submit solution</Button>
            </Box>
        </Container>
    );
}