import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";
import {Activity, ApiResponse, LearningExperience, LearningSubjectLearningView} from "src/services/types";


export async function createLearningExperience(learningSubjectId: string, elementalRequirementId: string): Promise<ApiResponse<LearningExperience<Activity>>> {
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

export async function createSimilarLearningExperience(learningExperienceId: string): Promise<ApiResponse<LearningExperience<Activity>>> {
    let body = JSON.stringify({
        "learningExperienceId": learningExperienceId,
    });
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-experience/create-similar`,
                {method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body});
            return await response.json();
        }
    );
}

export async function getLearningExperienceById(id: string): Promise<ApiResponse<LearningExperience<Activity>>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-experience/${id}`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}