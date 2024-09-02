import { catchClientErrors, getDefaultHeadersAuthenticated, LEARNING_API } from "./apiCommons";

export async function generateLearningResource(learningResourceDefinitionId) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceDefinitionId: learningResourceDefinitionId });
            const response = await fetch(`${LEARNING_API}/learning-resource`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function assessSolution(learningResourceId, solutionText, hintsRevealed) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceId: learningResourceId, solutionSubmissionText: solutionText, hintsRevealedCount: hintsRevealed });
            const response = await fetch(`${LEARNING_API}/learning-resource/assess-solution`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function getLearningResourceById(learningResourceId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/learning-resource?learningResourceId=${learningResourceId}`, 
                { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}