import {getAuthorizationToken, getProtocol, invalidAuthenticationCode, logout} from "./authenticationService";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const API_VERSION = "v1";

export const API_PATH = `${getProtocol()}//${BACKEND_HOST}/api/${API_VERSION}`;

export const LEARNING_API = `${API_PATH}/learning`;
export const MANAGEMENT_API = `${API_PATH}/management`;

export const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
};

export async function getDefaultHeadersAuthenticated() {
    if (import.meta.env.VITE_ENV_MODE === "dev") {
        return {
            ...defaultHeaders,
            "Authorization": `Bearer ${await getAuthorizationToken()}`
        };
    }
    return {
        ...defaultHeaders,
        // "Authorization": `Bearer ${await getAuthorizationToken()}`
        // TODO: resolve security - csrf token
        // "X-CSRF-Token": getCookie("XSRF-TOKEN")
    };
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
        const response = await fetchFunction();
        if (response.error && response.error.code === invalidAuthenticationCode) {
            logout().then();
        }
        return response;
    } catch (e: unknown) {
        return { data: null, error: clientError(e as Error), success: false }
    }
};