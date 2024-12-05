import { getAuthorizationToken } from "./authPlaceholder";

const BACKEND_HOST = import.meta.env.VITE_DOMAIN_HOSTNAME;
const API_VERSION = "v1";

export const API_PATH = `http://${BACKEND_HOST}/system/api/${API_VERSION}`;

export const LEARNING_API = `${API_PATH}/learning`;
export const MANAGEMENT_API = `${API_PATH}/management`;

//TODO: switch to cookie-based auth
export const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
};

export async function getDefaultHeadersAuthenticated() {
    return {
        ...defaultHeaders,
        // "Authorization": `Bearer ${await getAuthorizationToken()}`
        // TODO: resolve security - csrf token
        // "X-CSRF-Token": getCookie("XSRF-TOKEN")
    }
}

/**
 * Util function for client error generation
 */
const clientError = (ex: Error) => {
    return { code: "CLIENT-ERROR-[" + ex.name + "]", message: ex.message }
};

/**
 * Utility function used to catch client errors in service functions
 * @returns 
 */
export const catchClientErrors = async (fetchFunction: () => Promise<any>) => {
    try {
        return await fetchFunction();
    } catch (e: unknown) {
        return { data: null, error: clientError(e as Error), success: false }
    }
};