
// ==== COOKIE AUTHENTICATION FUNCTIONS ====

export async function logout() {
    const response = await fetch(window.location.protocol + "//" + import.meta.env.VITE_BACKEND_HOST + "/logout",
        { method: "POST", credentials: "include" });
    console.log(response)
    if (response.ok) {
        window.location.href = window.location.origin + import.meta.env.VITE_BASE_PATH_OVERRIDE;
    }
}

export async function authenticationCheck() {
    return await fetch(window.location.protocol + "//" +import.meta.env.VITE_BACKEND_HOST + "/api/v1/inspection/test-authentication", {credentials: "include"});
}


// ==== DEVELOPMENT TOKEN SERVICE ====

const TOKEN_URL = "http://localhost:8080/auth/realms/baeldung/protocol/openid-connect/token";

export async function getAuthorizationToken() {
    const response = await fetch(TOKEN_URL, { 
        method: "POST", 
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: new URLSearchParams({
            "client_id": "baeldung-confidential",
            "client_secret": "secret",
            "grant_type": "password",
            "username": "admin123",
            "password": "admin",
            "redirect_uri": "http://127.0.0.1:7080/bff/login/oauth2/code/baeldung"
        })
    });
    const data = await response.json();
    return data.access_token;
}