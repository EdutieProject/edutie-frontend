import {daysAgo} from "../features/datetime/datetimeUtilities";
import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "./apiCommons";

const PROFILE_API = `${API_PATH}/profiles`;


export async function getStudentLatestLearningResults() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${PROFILE_API}/student/learning-results/retrieve-latest?maxDate=${daysAgo(7).toISOString()}`, { method: "GET", headers: await getDefaultHeadersAuthenticated() });
            return await response.json();
        }
    );
}

export async function getUserDetails() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${PROFILE_API}/user/details`, {
                method: "GET",
                headers: await getDefaultHeadersAuthenticated()
            });
            return await response.json();
        }
    );
}