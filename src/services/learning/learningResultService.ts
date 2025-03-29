import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";
import {
    Activity,
    ApiResponse,
    LearningExperience,
    LearningResult,
    SimpleProblemActivitySolutionSubmission
} from "src/services/types";


export async function createSimpleProblemActivityLearningResult(learningExperienceId: string, solutionSubmission: SimpleProblemActivitySolutionSubmission): Promise<ApiResponse<LearningResult<SimpleProblemActivitySolutionSubmission>>> {
    let body = JSON.stringify({
        "learningExperienceId": learningExperienceId,
        "solutionSubmission": solutionSubmission
    })
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-result/create/simple-problem-activity`,
                {method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body});
            return await response.json();
        }
    );
}

export async function getLearningResultById(id: string): Promise<ApiResponse<LearningResult<any>>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-result/${id}`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}