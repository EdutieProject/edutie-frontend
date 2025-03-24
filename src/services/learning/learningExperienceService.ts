import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";
import {ApiResponse, LearningExperience, LearningSubjectLearningView} from "src/services/types";


export async function createLearningExperience(learningSubjectId: string, elementalRequirementId: string | null): Promise<ApiResponse<LearningExperience<unknown>>> {
    let body = JSON.stringify({
        "learningSubjectId": learningSubjectId,
        "elementalRequirementId": elementalRequirementId
    });
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-experience/create`,
                {method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body});
            return await response.json();
        }
    );
}

export async function getLearningExperienceById(id: string): Promise<ApiResponse<LearningExperience<unknown>>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-experience/${id}`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}