import { LEARNING_API, catchClientErrors, defaultHeaders } from "./apiCommons";

const STUDY_PROGRAM_API = LEARNING_API + "/study-program";

export async function getSciences() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/sciences`, { method: "GET", headers: defaultHeaders });
            return await response.json();
        }
    );
}

export async function getCourses(scienceId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/courses?scienceId=${scienceId}`, { method: "GET", headers: defaultHeaders })
            return await response.json();
        }
    );
}

export async function getProgressedCourses() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/courses/progressed`, { method: "GET", headers: defaultHeaders })
            return await response.json();
        }
    );
}

export async function getLessons(courseId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/lessons?courseId=${courseId}`, { method: "GET", headers: defaultHeaders });
            return await response.json();
        }
    );
}

export async function getSegments(lessonId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/segments?lessonId=${lessonId}`, { method: "GET", headers: defaultHeaders });
            return await response.json();
        }
    );
}