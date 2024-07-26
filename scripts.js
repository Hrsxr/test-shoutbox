document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('username')) {
        document.querySelector('.login-box').style.display = 'none';
        document.querySelector('.shoutbox-container').style.display = 'block';
        document.getElementById('user-display').innerText = localStorage.getItem('username');
        loadMessages();
    }
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedPassword = localStorage.getItem(`user_${username}`);
    if (storedPassword === password) {
        localStorage.setItem('username', username);
        document.querySelector('.login-box').style.display = 'none';
        document.querySelector('.shoutbox-container').style.display = 'block';
        document.getElementById('user-display').innerText = username;
        loadMessages();
    } else if (!storedPassword) {
        localStorage.setItem(`user_${username}`, password);
        localStorage.setItem('username', username);
        document.querySelector('.login-box').style.display = 'none';
        document.querySelector('.shoutbox-container').style.display = 'block';
        document.getElementById('user-display').innerText = username;
        loadMessages();
    } else {
        alert('Incorrect username or password');
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
