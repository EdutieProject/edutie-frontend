import { catchClientErrors, getDefaultHeadersAuthenticated, LEARNING_API } from "./apiCommons";

export async function generateLearningResource(learningResourceDefinitionId) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceDefinitionId: learningResourceDefinitionId });
            const response = await fetch(`${LEARNING_API}/resources/create-from-definition`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function generateRandomFactLearningResource(randomFact) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ randomFact: randomFact });
            const response = await fetch(`${LEARNING_API}/resources/create-dynamic`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function getLearningResourceById(learningResourceId) {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${LEARNING_API}/resources/${learningResourceId}`,
                { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}

export async function generateLearningResultFromSolution(learningResourceId, solutionText, hintsRevealed) {
    return await catchClientErrors(
        async () => {
            const body = JSON.stringify({ learningResourceId: learningResourceId, solutionSubmissionText: solutionText, hintsRevealedCount: hintsRevealed });
            const response = await fetch(`${LEARNING_API}/results/create-from-solution`, { method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body });
            return await response.json();
        }
    );
}

export async function getLearningResultById(learningResultId) {
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