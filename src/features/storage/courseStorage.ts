/** Course-related state caching */

export const noSavedCourseIdPlaceholder = "no-course-id-saved";

export const getSavedCourseId = () => localStorage.getItem("currentCourseId") ?? noSavedCourseIdPlaceholder;
export const saveCourseId = (courseId: string) => localStorage.setItem("currentCourseId", courseId);
export const clearSavedCourseId = () => localStorage.removeItem("currentCourseId")