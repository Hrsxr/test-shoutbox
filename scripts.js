document.addEventListener('DOMContentLoaded', (event) => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.querySelector('.login-box').style.display = 'none';
        document.querySelector('.shoutbox-container').style.display = 'block';
        document.getElementById('user-display').innerText = storedUsername;
        loadMessages();
    }
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    const storedPassword = localStorage.getItem(`user_${username}`);
    
    if (storedPassword === null) {
        // User does not exist, register new user
        if (username && password) {
            localStorage.setItem(`user_${username}`, password);
            localStorage.setItem('username', username);
            document.querySelector('.login-box').style.display = 'none';
            document.querySelector('.shoutbox-container').style.display = 'block';
            document.getElementById('user-display').innerText = username;
            loadMessages();
        }
    } else if (storedPassword === password) {
        // Successful login
        localStorage.setItem('username', username);
        document.querySelector('.login-box').style.display = 'none';
        document.querySelector('.shoutbox-container').style.display = 'block';
        document.getElementById('user-display').innerText = username;
        loadMessages();
        errorElement.textContent = '';
    } else {
        // Incorrect password
        errorElement.textContent = 'Incorrect username or password';
    }
}

function logout() {
    localStorage.removeItem('username');
    document.querySelector('.login-box').style.display = 'block';
    document.querySelector('.shoutbox-container').style.display = 'none';
}

function shout() {
    const username = localStorage.getItem('username');
    const text = document.getElementById('message').value;
    if (text) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ username, text });
        localStorage.setItem('messages', JSON.stringify(messages));
        document.getElementById('message').value = '';
        loadMessages();
    }
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesList = document.getElementById('messages');
    messagesList.innerHTML = '';
    messages.forEach(message => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
        messagesList.appendChild(li);
    });
}
