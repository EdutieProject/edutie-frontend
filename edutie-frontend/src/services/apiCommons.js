import { getAuthorizationToken } from "./authPlaceholder";

const BACKEND_HOST = "localhost:8081";
const API_VERSION = "v1";

export const API_PATH = `http://${BACKEND_HOST}/api/${API_VERSION}`;

export const LEARNING_API = `${API_PATH}/learning`;
export const MANAGEMENT_API = `${API_PATH}/management`;

//TODO: switch to cookie-based auth
export const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Authorization": `Bearer ${await getAuthorizationToken()}`
}; 

/**
 * Util function for client error generation
 * @param {Exception} ex 
 */
const clientError = (ex) => { 
    return { code: "CLIENT-API-ERROR", message: ex.message } 
};

/**
 * Utility function used to catch client errors in service functions
 * @param {*} fetchFunction 
 * @returns 
 */
export const catchClientErrors = async (fetchFunction) => {
    try {
        return await fetchFunction();
    } catch (e) {
        return { data: null, error: clientError(e), success: false }
    }
};