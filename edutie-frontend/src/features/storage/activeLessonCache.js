/**
 *  Active lesson caching made for learning result view redirection 
 * 
 * 
 *  Not implemented as of 27.09.2024 due to different lesson possibilty errors
*/
export const noActiveLessonInCachePlacehodler = "no-active-lesson-in-cache";

export const getActiveLessonId = () => localStorage.getItem("activeLessonId") ?? noActiveLessonInCachePlacehodler;
export const saveActiveLessonId = (activeLessonId) => localStorage.setItem("activeLessonId", activeLessonId);