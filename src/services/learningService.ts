import { catchClientErrors, getDefaultHeadersAuthenticated, LEARNING_API } from "./apiCommons.js";

export async function generateLearningResource(learningResourceDefinitionId: string) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceDefinitionId: learningResourceDefinitionId });
            const response = await fetch(`${LEARNING_API}/resources/create-from-definition`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function generateSimilarLearningResource(learningResourceId: string): Promise<any> {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceId: learningResourceId });
            const response = await fetch(`${LEARNING_API}/resources/create-similar`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function generateDynamicLearningResource(context: string) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ contextText: context, contextType: "RANDOM_FACT" });
            const response = await fetch(`${LEARNING_API}/resources/create-dynamic`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function getLearningResourceById(learningResourceId: string) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/resources/${learningResourceId}`,
                { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}

export async function getLatestLearningResourcesById(): Promise<Array<any>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/resources/get-latest`,
                { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}

export async function generateLearningResultFromSolution(learningResourceId: string, solutionText: string, hintsRevealed: number) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceId: learningResourceId, solutionSubmissionText: solutionText, hintsRevealedCount: hintsRevealed });
            const response = await fetch(`${LEARNING_API}/results/create-from-solution`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function getLearningResultById(learningResultId: string) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/results/${learningResultId}`,
                { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}

export async function getRandomFact() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/ancillaries/random-fact`, 
                { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}

export async function getLatestActivity() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/ancillaries/latest-activity`,
                { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}