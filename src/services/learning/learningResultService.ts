import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";
import {ApiResponse, LearningResult, SimpleProblemActivitySolutionSubmission} from "src/services/types";


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