import { catchClientErrors, getDefaultHeadersAuthenticated, LEARNING_API } from "./apiCommons";

export async function generateLearningResource(learningResourceDefinitionId) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceDefinitionId: learningResourceDefinitionId })
            const response = await fetch(`${LEARNING_API}/learning-resource`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body })
            return await response.json();
        }
    );
}