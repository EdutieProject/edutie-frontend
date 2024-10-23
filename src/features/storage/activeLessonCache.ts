/**
 *  Active lesson caching made for learning result view redirection 
 * 
 * 
 *  Not implemented as of 27.09.2024 due to different lesson possibility errors
*/
export const noActiveLessonInCachePlaceholder = "no-active-lesson-in-cache";

export const getActiveLessonId = () => localStorage.getItem("activeLessonId") ?? noActiveLessonInCachePlaceholder;
export const saveActiveLessonId = (activeLessonId: string) => localStorage.setItem("activeLessonId", activeLessonId);