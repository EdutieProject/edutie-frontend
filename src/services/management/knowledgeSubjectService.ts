import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";
import {KnowledgeSubjectSearchView} from "src/services/management/types";


export async function searchKnowledgeSubjects(searchName: string): Promise<ApiResponse<Array<KnowledgeSubjectSearchView>>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/knowledge-subject/search?searchName=${searchName}`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}