import React, {Dispatch, SetStateAction} from "react";
import {Activity, ApiError, SimpleProblemActivity} from "src/services/types";
import SimpleProblemActivityComponent from "src/views/learn/learningexperience/activities/SimpleProblemActivity";
import ErrorView from "src/views/common/ErrorView";

interface ActivityRouterProps {
    activity: Activity;
    setLearningResultLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<ApiError>>
    learningExperienceId: string;
}

export default function ActivityRouter(props: ActivityRouterProps) {
    let activity = props.activity;
    switch (activity.activityName) {
        case 'SimpleProblemActivity': //TODO: fix this
            return <SimpleProblemActivityComponent
                activity={activity as SimpleProblemActivity}
                setLearningResultLoading={props.setLearningResultLoading}
                setError={props.setError}
                learningExperienceId={props.learningExperienceId}
            />

        default:
            return <ErrorView error={{code: "CLIENT-ERROR-ACTIVITY-ROUTER", message: "Failed to match activity type"}}/>
    }
}