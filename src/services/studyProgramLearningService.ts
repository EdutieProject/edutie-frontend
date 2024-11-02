import { LEARNING_API, catchClientErrors, getDefaultHeadersAuthenticated } from "./apiCommons.js";

const STUDY_PROGRAM_API = LEARNING_API + "/study-program";

export async function getAccessibleSciences() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/sciences/retrieve-accessible`, { method: "GET", headers: await getDefaultHeadersAuthenticated() });
            return await response.json();
        }
    );
}

export async function getCoursesByScience(scienceId: string) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/courses/retrieve-by-science?scienceId=${scienceId}`, { method: "GET", headers: await getDefaultHeadersAuthenticated() })
            return await response.json();
        }
    );
}

export async function getCourseDetailsById(courseId: string) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/courses/${courseId}`, { method: "GET", headers: await getDefaultHeadersAuthenticated() })
            return await response.json();
        }
    );
}

export async function getLessonsByCourse(courseId: string) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/lessons/retrieve-by-course?courseId=${courseId}`, { method: "GET", headers: await getDefaultHeadersAuthenticated() });
            return await response.json();
        }
    );
}

export async function getSegmentsByLesson(lessonId: string) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDY_PROGRAM_API}/segments/retrieve-by-lesson?lessonId=${lessonId}`, { method: "GET", headers: await getDefaultHeadersAuthenticated() });
            return await response.json();
        }
    );
}