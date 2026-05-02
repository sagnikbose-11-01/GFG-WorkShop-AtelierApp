// static/concierge.js
document.addEventListener('DOMContentLoaded', () => {
    initConcierge();
});

function initConcierge() {
    const bubble = document.getElementById('concierge-bubble');
    const chatWindow = document.getElementById('concierge-chat');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-message-btn');
    const input = document.getElementById('chat-input-field');
    const messagesContainer = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');

    bubble.addEventListener('click', () => {
        chatWindow.classList.add('active');
        loadChatHistory();
        // If empty, add a welcome message
        if (getChatHistory().length === 0) {
            addMessage('bot', "Welcome to The Atelier. How may I assist you with your wardrobe selections today?");
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    sendBtn.addEventListener('click', handleSendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    function handleSendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Fetch response
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        })
        .then(res => res.json())
        .then(data => {
            hideTypingIndicator();
            addMessage('bot', data.reply);
        })
        .catch(err => {
            console.error('Chat error:', err);
            hideTypingIndicator();
            addMessage('bot', "I apologize, but I am currently unavailable. Please try again later.");
        });
    }

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();

        // Save to history
        const history = getChatHistory();
        history.push({ sender, text });
        localStorage.setItem('conciergeChatHistory', JSON.stringify(history));
    }

    function getChatHistory() {
        return JSON.parse(localStorage.getItem('conciergeChatHistory')) || [];
    }

    function loadChatHistory() {
        messagesContainer.innerHTML = '';
        const history = getChatHistory();
        history.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${msg.sender}`;
            msgDiv.textContent = msg.text;
            messagesContainer.appendChild(msgDiv);
        });
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        typingIndicator.classList.add('active');
        messagesContainer.appendChild(typingIndicator); // move to bottom
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.classList.remove('active');
    }
}
