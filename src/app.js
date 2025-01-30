// Auth0 WebAuth-Objekt
var webAuth = new auth0.WebAuth({
    domain: "sono-labs.eu.auth0.com",
    clientID: "yHSy0NPtK3HkymKuQOZN2njqKFytf1ga",
    redirectUri: window.location.href,
    responseType: "token id_token",
    scope: "openid profile email"
});

// Diese Funktion überprüft und verarbeitet die Authentifizierung
function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Speichern der Token im LocalStorage
            localStorage.setItem("access_token", authResult.accessToken);
            localStorage.setItem("id_token", authResult.idToken);
            // Den ToDo-Bereich anzeigen
            document.getElementById("app").style.display = "block";
            showMessage(); // Willkommen-Nachricht anzeigen
        } else {
            login(); // Wenn keine Authentifizierung, dann anmelden
        }
    });
}

// Anmeldefunktion
function login() {
    webAuth.authorize();
}

// Funktion, um eine Nachricht anzuzeigen
function showMessage() {
    alert("Hallo! Willkommen in der modernen Web App.");
}

// Funktionsaufruf, um die Authentifizierung zu starten
handleAuthentication();

// ToDo-Funktionalitäten
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');
const todoContainer = document.getElementById('todo-container');

// Wenn der Benutzer eingeloggt ist, zeigt die App den ToDo-Bereich
const showTodoApp = () => {
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
    todoContainer.style.display = 'block';
    loadTodos(); // Lade die ToDos
};

// ToDo-Daten laden
const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        todoList.appendChild(li);
    });
};

// ToDo hinzufügen
const addTodo = () => {
    const todo = todoInput.value.trim();
    if (todo) {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
        todoInput.value = '';
    }
};

// Logout-Funktion
const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    showLoginButton(); // Wechsel zurück zur Login-Seite
};

// Anzeigen des Login-Buttons
const showLoginButton = () => {
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
    todoContainer.style.display = 'none';
};

// Event-Listener für Buttons
loginButton.addEventListener('click', login);
logoutButton.addEventListener('click', logout);
addTodoButton.addEventListener('click', addTodo);
