import {LearningSubject} from "src/services/management/types";
import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";

export async function getLearningSubjectById(id: string): Promise<ApiResponse<LearningSubject>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-subject/${id}`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}

export async function createLearningSubject(name: string): Promise<ApiResponse<LearningSubject>> {
    let body = JSON.stringify({
        "learningSubjectName": name
    });
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-subject/create`,
                {method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body});
            return await response.json();
        }
    );
}

export async function setKnowledgeSubject(learningSubjectId: string, knowledgeSubjectId: string): Promise<ApiResponse<LearningSubject>> {
    let body = JSON.stringify({
        "learningSubjectId": learningSubjectId,
        "knowledgeSubjectId": knowledgeSubjectId
    });
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-subject/set-knowledge-subject`,
                {method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body});
            return await response.json();
        }
    );
}

export async function addLearningSubjectRequirement(learningSubjectId: string, requirementTitle: string, ordinal: number): Promise<ApiResponse<LearningSubject>> {
    let body = JSON.stringify({
        "learningSubjectId": learningSubjectId,
        "requirementTitle": requirementTitle,
        "requirementOrdinal": ordinal
    });
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/learning-subject/add-requirement`,
                {method: "POST", headers: await getDefaultHeadersAuthenticated(), body: body});
            return await response.json();
        }
    );
}