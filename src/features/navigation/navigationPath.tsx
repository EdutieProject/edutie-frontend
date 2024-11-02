import GlobeIcon from "../../components/customIcons/GlobeIcon";
import {NavigateFunction} from "react-router-dom";
import DistributedLearningIcon from "../../components/customIcons/DistributedLearningIcon";
import {getSavedCourseId} from "../storage/courseStorage";
import CoursesIcon from "../../components/customIcons/CoursesIcon";
import StudentUserIcon from "../../components/customIcons/StudentUserIcon";
import React from "react";

export const navigationPath = {
    home: "/",
    courses: "/courses",
    lessonTree: "/courses/:courseId",
    segmentTree: "/lessons/:lessonId",
    segment: "/segments/:segmentId",
    exercise: "/learning-resource/:resourceId",
    learningResult: "/learning-result/:resultId",
    account: "/profiles/:id",
    creation: "/create/lrd",
    /**
     * Fills a navigation path with provided arguments.
     * @param {string} p path to fill
     * @param  {...string} args path params to fill with
     * @returns
     */
    fillPath: (p: String, ...args: Array<String>) => {
        let counter = 0;
        return p.split("/").map((o, i) => i === 0 ? "" : o.startsWith(":") ? "/" + args[counter++] : "/" + o).join('');
    }
}
export const navSections = {
    home: "HOME",
    learningInTree: "LEARNING-TREE",
    courses: "COURSES",
    profile: "PROFILE"
}
const iconSize = "2.25rem";
export const navElements = [
    {
        id: navSections.home,
        icon: (color: string) => <GlobeIcon color={color} height={iconSize} width={iconSize}/>,
        navigate: (navigate: NavigateFunction) => navigate(navigationPath.home),
    },
    {
        id: navSections.learningInTree,
        icon: (color: string) => <DistributedLearningIcon color={color} height={iconSize} width={iconSize}/>,
        navigate: (navigate: NavigateFunction) => navigate(navigationPath.fillPath(navigationPath.lessonTree, getSavedCourseId()))
    },
    {
        id: navSections.courses,
        icon: (color: string) => <CoursesIcon color={color} height={iconSize} width={iconSize}/>,
        navigate: (navigate: NavigateFunction) => navigate(navigationPath.courses)
    },
    {
        id: navSections.profile,
        icon: (color: string) => <StudentUserIcon color={color} height={iconSize} width={iconSize}/>,
        navigate: (navigate: NavigateFunction) => navigate(navigationPath.fillPath(navigationPath.account, "myself"))
    }
];