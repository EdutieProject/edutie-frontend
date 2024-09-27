/** Active segment caching made for learning result view redirection */
export const noActiveSegmentInCachePlacehodler = "no-active-segment-in-cache";

export const getActiveSegmentId = () => localStorage.getItem("activeSegmentId") ?? noActiveSegmentInCachePlacehodler;
export const saveActiveSegmentId = (activeSegmentId) => localStorage.setItem("activeSegmentId", activeSegmentId);