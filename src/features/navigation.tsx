import DistributedLearningIcon from '../components/customIcons/DistributedLearningIcon';
import GlobeIcon from "../components/customIcons/GlobeIcon";
import UserIcon from '../components/customIcons/StudentUserIcon';
import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {getSavedCourseId} from './storage/courseStorage';
import CoursesIcon from '../components/customIcons/CoursesIcon';
import {NavigateFunction} from "react-router-dom";


// ===== NAVIGATION PATHS ======

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


// ===== NAVIGATION SECTIONS =====

export const navSections = {
    home: "HOME",
    learningInTree: "LEARNING-TREE",
    courses: "COURSES",
    profile: "PROFILE"
}


// ===== SAVED NAV STATE ======

interface SelectedNavigationSelectionContextType {
    selectedSectionId: String;
    setSelectedSectionId: Dispatch<SetStateAction<string>>;
}

export const SelectedNavigationSectionContext = createContext<SelectedNavigationSelectionContextType>({
    setSelectedSectionId: () => {
    }, selectedSectionId: ""
});


interface SelectedNavigationSectionProviderProps {
    children: React.ReactNode;
}

/**
 * This component is responsible for navbar state's management as well as for it overridability.
 * The structure looks like this: SelectedNavigationSectionProvider -> Router -> Navlayout -> Navbar
 * NavBar uses this context as a manager of its state that is agnostic from the routing re-rendering.
 * @returns JSX element
 */
export const SelectedNavigationSectionProvider = ({children}: SelectedNavigationSectionProviderProps) => {
    const [selectedSectionId, setSelectedSectionId] = useState(navSections.home);

    return (
        <SelectedNavigationSectionContext.Provider
            value={{selectedSectionId: selectedSectionId, setSelectedSectionId: setSelectedSectionId}}
        >{children}
        </SelectedNavigationSectionContext.Provider>
    );
}


// ===== NAVBAR ELEMENTS ========

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
        icon: (color: string) => <UserIcon color={color} height={iconSize} width={iconSize}/>,
        navigate: (navigate: NavigateFunction) => navigate(navigationPath.fillPath(navigationPath.account, "myself"))
    }
];