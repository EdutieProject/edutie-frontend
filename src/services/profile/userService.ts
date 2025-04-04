import {ApiResponse, LearningSubjectManagementView, UserDetails} from "src/services/types";
import {API_PATH, catchClientErrors, getDefaultHeadersAuthenticated} from "src/services/apiCommons";


export async function getUserDetails(): Promise<ApiResponse<UserDetails>> {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/profiles/user/details`,
                {method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}