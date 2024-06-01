import { LEARNING_API, defaultHeaders } from "./apiConfig";


export async function getCourses(scienceId) {
    const response = await fetch(`${LEARNING_API}/courses?scienceId=${scienceId}`, { method: "GET", headers: defaultHeaders })
    return await response.json();
}

export async function getProgressedCourses() {
    const response = await fetch(`${LEARNING_API}/courses/progressed`, { method: "GET", headers: defaultHeaders })
    return await response.json();
}

export async function getLessons(courseId) {
    const response = await fetch(`${LEARNING_API}/lessons?courseId=${courseId}`, { method: "GET", headers: defaultHeaders });
    return await response.json();
}

export async function getSegments(lessonId) {
    const response = await fetch(`${LEARNING_API}/segments?lessonId=${lessonId}`, { method: "GET", headers: defaultHeaders });
    return await response.json();
}