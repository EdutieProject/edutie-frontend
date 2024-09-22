import { API_PATH, catchClientErrors, getDefaultHeadersAuthenticated } from "./apiCommons";

const STUDENT_PROFILE_API = `${API_PATH}/profiles/student`;

export async function getStudentLatestLearningResults() {
    const amount = 5;
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${STUDENT_PROFILE_API}/learning-results/latest?amount=${amount}`, { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}