import React from "react";
import {Activity, SimpleProblemActivity} from "src/services/types";
import SimpleProblemActivityComponent from "src/views/learn/learningexperience/activities/SimpleProblemActivity";
import ErrorView from "src/views/common/ErrorView";

interface ActivityRouterProps {
    activity: Activity
}

export default function ActivityRouter(props: ActivityRouterProps) {
    let activity = props.activity;
    switch (activity.activityName) {
        case 'SimpleProblemActivity':
            return <SimpleProblemActivityComponent activity={activity as SimpleProblemActivity}/>

        default:
            return <ErrorView error={{code: "CLIENT-ERROR-ACTIVITY-ROUTER", message: "Failed to match activity type"}}/>
    }
}