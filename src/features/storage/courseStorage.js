/** Course-related state caching */

export const noSavedCourseIdPlaceholder = "no-course-id-saved";

export const getSavedCourseId = () => localStorage.getItem("currentCourseId") ?? noSavedCourseIdPlaceholder;
export const saveCourseId = (courseId) => localStorage.setItem("currentCourseId", courseId);