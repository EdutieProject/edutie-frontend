import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";
import {ApiResponse, LearningSubject, LearningSubjectLearningView} from "src/services/types";


export async function getLearningSubjectById(id: string): Promise<ApiResponse<LearningSubjectLearningView>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-subject/${id}/learning`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}

export async function getCreatedEligibleLearningSubjects(): Promise<ApiResponse<Array<LearningSubject>>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-subject/eligible`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}