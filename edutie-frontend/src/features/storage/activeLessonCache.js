/** Active lesson caching made for learning result view redirection */
export const noActiveLessonInCachePlacehodler = "no-active-lesson-in-cache";

export const getActiveLessonId = () => localStorage.getItem("activeLessonId") ?? noActiveLessonInCachePlacehodler;
export const saveActiveLessonId = (activeLessonId) => localStorage.setItem("activeLessonId", activeLessonId);