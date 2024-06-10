const BACKEND_HOST = "localhost:8081";
const API_VERSION = "v1";

export const API_PATH = `http://${BACKEND_HOST}/api/${API_VERSION}`;

export const LEARNING_API = `${API_PATH}/learning`;
export const MANAGEMENT_API = `${API_PATH}/management`;

export const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
}; //TODO: add bearer token and self-managing authentication