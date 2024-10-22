import DistributedLearningIcon from '../components/customIcons/DistributedLearningIcon';
import EdutieHomeIcon from "../components/customIcons/EdutieHomeIcon";
import ExcerciseNotebookIcon from '../components/customIcons/ExcerciseNotebookIcon';
import UserIcon from '../components/customIcons/StudentUserIcon';
import { createContext, useState } from 'react';
import { getSavedCourseId } from './storage/courseStorage';
import CoursesIcon from '../components/customIcons/CoursesIcon';


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
  fillPath: (p, ...args) => {
    let counter = 0;
    return p.split("/").map((o, i) => i == 0 ? "" : o.startsWith(":") ? "/" + args[counter++] : "/" + o).join('');
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

export const SelectedNavigationSectionContext = createContext();

/**
 * This component is responsible for navbar state's management as well as for it overridability.
 * The structure looks like this: SelectedNavigationSectionProvider -> Router -> Navlayout -> Navbar
 * NavBar uses this context as a manager of its state that is agnostic from the routing re-rendering. 
 * @param {Object} params 
 * @returns JSX element
 */
export const SelectedNavigationSectionProvider = ({ children }) => {
  const [selectedSectionId, setSelectedSectionId] = useState(navSections.home);

  return (
    <SelectedNavigationSectionContext.Provider
      value={{ selectedSectionId: selectedSectionId, setSelectedSectionId: setSelectedSectionId }}
    >{children}
    </SelectedNavigationSectionContext.Provider>
  );
}


// ===== NAVBAR ELEMENTS ========

const iconSize = "2.25rem";

export const navElements = [
  {
    id: navSections.home,
    icon: (color) => <EdutieHomeIcon color={color} height={iconSize} width={iconSize} />,
    navigate: (navigate) => navigate(navigationPath.home),
  },
  {
    id: navSections.learningInTree,
    icon: (color) => <DistributedLearningIcon color={color} height={iconSize} width={iconSize} />,
    navigate: (navigate) => navigate(navigationPath.fillPath(navigationPath.lessonTree, getSavedCourseId()))
  },
  {
    id: navSections.courses,
    icon: (color) => <CoursesIcon color={color} height={iconSize} width={iconSize} />,
    navigate: (navigate) => navigate(navigationPath.courses)
  },
  {
    id: navSections.profile,
    icon: (color) => <UserIcon color={color} height={iconSize} width={iconSize} />,
    navigate: (navigate) => navigate(navigationPath.fillPath(navigationPath.account, "myself"))
  }
];