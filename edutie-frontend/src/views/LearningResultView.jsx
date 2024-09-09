import { useLocation, useParams } from "react-router-dom";
import NavLayout from "./layout/NavLayout";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getLearningResultById } from "../services/LearningService";
import ErrorView from "./common/ErrorView";


export default function LearningResultView() {
    const theme = useTheme();
    const { resultId } = useParams();
    const { state } = useLocation();
    const [learningResult, setLearningResult] = useState(state);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (learningResult !== null)
            return;
        getLearningResultById(resultId)
            .then(learningResultResponse => {
                setLearningResult(learningResultResponse.data);
                setError(learningResultResponse.error);
            });
    }, []);

    if (error)
        return <ErrorView error={error}/>

    return (
        <NavLayout mode="flex">

        </NavLayout>
    );
}