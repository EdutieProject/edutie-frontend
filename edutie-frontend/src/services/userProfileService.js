import {daysAgo} from "../features/datetime/datetimeUtilities";
import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "./apiCommons";

const STUDENT_PROFILE_API = `${API_PATH}/profiles/student`;

export async function getStudentLatestLearningResults() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDENT_PROFILE_API}/learning-results/retrieve-latest?maxDate=${daysAgo(7).toISOString()}`, { method: "GET", headers: await getDefaultHeadersAuthenticated() });
            return await response.json();
        }
    );
}

export async function getUserDetails() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/user/details`, {
                method: "GET",
                headers: await getDefaultHeadersAuthenticated()
            });
            return await response.json();
        }
    );
}