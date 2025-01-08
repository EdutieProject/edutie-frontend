
// ==== COOKIE AUTHENTICATION FUNCTIONS ====

export function getProtocol(): string {
    return import.meta.env.VITE_ENV_MODE === "prod" ? "https:" : "http:";
}

export async function logout() {
    const response = await fetch(getProtocol() + "//" + import.meta.env.VITE_BACKEND_HOST + "/logout",
        { method: "POST", credentials: "include" });
    console.log(response)
    if (response.ok) {
        window.location.href = window.location.origin; // Return to main page by convention
    }
}

export async function authenticationCheck() {
    return await fetch(getProtocol() + "//" +import.meta.env.VITE_BACKEND_HOST + "/api/v1/inspection/test-authentication", {credentials: "include"});
}

export function getLoginUrl() {
    return getProtocol() + "//" + import.meta.env.VITE_BACKEND_HOST + "/oauth2/authorization/edutie";
}

export const invalidAuthenticationCode = "INVALID-AUTHENTICATION-401";

// ==== DEVELOPMENT TOKEN SERVICE ====

const TOKEN_URL = "http://localhost:8080/auth/realms/edutie/protocol/openid-connect/token";

export async function getAuthorizationToken() {
    const response = await fetch(TOKEN_URL, { 
        method: "POST", 
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: new URLSearchParams({
            "client_id": "edutie-confidential",
            "client_secret": "secret",
            "grant_type": "password",
            "username": "admin123",
            "password": "admin",
            "redirect_uri": "http://127.0.0.1:7080/system/login/oauth2/code/edutie"
        })
    });
    const data = await response.json();
    return data.access_token;
}