import { catchClientErrors, getDefaultHeadersAuthenticated, API_PATH } from "./apiCommons";

export async function getUserDetails() {
    return await catchClientErrors(
        async () => {
            const response = await fetch(`${API_PATH}/user/details`, { method: "GET", headers: await getDefaultHeadersAuthenticated()});
            return await response.json();
        }
    );
}