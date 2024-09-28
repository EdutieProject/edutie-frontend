
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