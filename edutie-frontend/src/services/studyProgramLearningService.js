import { LEARNING_API, catchClientErrors, defaultHeaders } from "./apiCommons";

export async function getSciences() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/sciences`, { method: "GET", headers: defaultHeaders });
            return await response.json();
        }
    );
}

export async function getCourses(scienceId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/courses?scienceId=${scienceId}`, { method: "GET", headers: defaultHeaders })
            return await response.json();
        }
    );
}

export async function getProgressedCourses() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/courses/progressed`, { method: "GET", headers: defaultHeaders })
            return await response.json();
        }
    );
}

export async function getLessons(courseId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/lessons?courseId=${courseId}`, { method: "GET", headers: defaultHeaders });
            return await response.json();
        }
    );
}

export async function getSegments(lessonId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/segments?lessonId=${lessonId}`, { method: "GET", headers: defaultHeaders });
            return await response.json();
        }
    );
}