let isConnected = false;

// Simulate user activity
let activeUsers = ["User1", "User2", "User3"];
let messages = [];
let privateMessages = [];

document.addEventListener("DOMContentLoaded", () => {
    updateStatus();
    updateActiveUsers();
    updateMessages();
    updatePrivateMessages();
    setInterval(checkConnection, 5000);
});

function updateStatus() {
    const statusElement = document.getElementById("status");
    statusElement.textContent = isConnected ? "Connected" : "Disconnected";
    statusElement.style.color = isConnected ? "green" : "red";
}

function updateActiveUsers() {
    const usersList = document.getElementById("activeUsers");
    usersList.innerHTML = "";
    activeUsers.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user;
        usersList.appendChild(li);
    });
}

function updateMessages() {
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = "";
    messages.forEach(message => {
        const div = document.createElement("div");
        div.textContent = message;
        messagesContainer.appendChild(div);
    });
}

function updatePrivateMessages() {
    const privateMessagesContainer = document.getElementById("privateMessages");
    privateMessagesContainer.innerHTML = "";
    privateMessages.forEach(message => {
        const div = document.createElement("div");
        div.textContent = message;
        privateMessagesContainer.appendChild(div);
    });
}

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    if (message) {
        messages.push(message);
        updateMessages();
        messageInput.value = "";
    }
}

function sendPrivateMessage() {
    const privateMessageInput = document.getElementById("privateMessageInput");
    const message = privateMessageInput.value.trim();
    if (message) {
        privateMessages.push(message);
        updatePrivateMessages();
        privateMessageInput.value = "";
    }
}

function checkConnection() {
    isConnected = navigator.onLine;
    updateStatus();
}
