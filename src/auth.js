require('dotenv').config()

var webAuth = new auth0.WebAuth({
    domain: "sono-labs.eu.auth0.com",
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: window.location.href,
    responseType: "token id_token",
    scope: "openid profile email"
});

function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            localStorage.setItem("access_token", authResult.accessToken);
            localStorage.setItem("id_token", authResult.idToken);
            window.location.href = "/app"; // Weiterleitung zur Haupt-App
        } else {
            login();
        }
    });
}

function login() {
    webAuth.authorize();
}

handleAuthentication();