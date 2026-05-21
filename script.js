// // State Management
// let history = [];
// let apiKey = localStorage.getItem('gemini_api_key') || '';
// let isSidebarOpen = false;
// const systemInstruction = "You are SteveChat, a helpful and intelligent AI assistant. Always use clean markdown for your responses. Keep your tone professional yet approachable.";

// const chatContainer = document.getElementById('chat-container');
// const userInput = document.getElementById('user-input');
// const sendBtn = document.getElementById('send-btn');
// const statsInfo = document.getElementById('stats-info');
// const sidebar = document.getElementById('sidebar');

// // Initialization
// window.onload = () => {
//     if (!apiKey) openSettings();
//     loadHistoryFromStorage();
// };

// // UI Helpers
// function toggleSidebar() {
//     isSidebarOpen = !isSidebarOpen;
//     sidebar.classList.toggle('active', isSidebarOpen);
// }

// function autoResize(textarea) {
//     textarea.style.height = 'auto';
//     textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
//     sendBtn.disabled = textarea.value.trim() === '';
// }

// function openSettings() {
//     document.getElementById('api-key-input').value = apiKey;
//     document.getElementById('settings-modal').style.display = 'flex';
// }

// function closeSettings() {
//     document.getElementById('settings-modal').style.display = 'none';
// }

// function saveApiKey() {
//     const key = document.getElementById('api-key-input').value.trim();
//     if (key) {
//         apiKey = key;
//         localStorage.setItem('gemini_api_key', key);
//         closeSettings();
//     } else {
//         alert('Please enter a valid API key.');
//     }
// }

// function getTimestamp() {
//     const now = new Date();
//     return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
// }

// // Markdown Parser (Simple Regex)
// function parseMarkdown(text) {
//     // Fenced code blocks
//     text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
//         const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
//         return `<pre><code>${escapedCode}</code><button class="copy-btn" onclick="copyCode(this)">Copy</button></pre>`;
//     });
//     // Inline code
//     text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
//     // Bold
//     text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
//     // Italics
//     text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
//     // New lines to br
//     text = text.replace(/\n/g, '<br>');
//     return text;
// }

// function copyCode(btn) {
//     const code = btn.previousElementSibling.innerText;
//     navigator.clipboard.writeText(code).then(() => {
//         const originalText = btn.innerText;
//         btn.innerText = 'Copied!';
//         setTimeout(() => btn.innerText = originalText, 2000);
//     });
// }

// // Message Handling
// function addMessage(role, text) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${role === 'user' ? 'user' : 'assistant'}`;
    
//     const bubble = document.createElement('div');
//     bubble.className = 'message-bubble';
//     bubble.innerHTML = role === 'user' ? text : parseMarkdown(text);
    
//     const timestamp = document.createElement('div');
//     timestamp.className = 'timestamp';
//     timestamp.innerText = getTimestamp();
    
//     messageDiv.appendChild(bubble);
//     messageDiv.appendChild(timestamp);
//     chatContainer.appendChild(messageDiv);
    
//     scrollToBottom();
//     updateStats();
// }

// function scrollToBottom() {
//     chatContainer.scrollTop = chatContainer.scrollHeight;
// }

// function updateStats() {
//     statsInfo.innerText = `${history.length} messages | SteveChat can make mistakes.`;
// }

// function showLoading() {
//     const loadingDiv = document.createElement('div');
//     loadingDiv.id = 'typing-indicator';
//     loadingDiv.className = 'message assistant';
//     loadingDiv.innerHTML = `<div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
//     chatContainer.appendChild(loadingDiv);
//     scrollToBottom();
// }

// function hideLoading() {
//     const loader = document.getElementById('typing-indicator');
//     if (loader) loader.remove();
// }

// // Core Functions
// async function sendMessage() {
//     const text = userInput.value.trim();
//     if (!text || !apiKey) return;

//     if (!apiKey) {
//         openSettings();
//         return;
//     }

//     // User message
//     addMessage('user', text);
//     history.push({ role: "user", parts: [{ text }] });
    
//     userInput.value = '';
//     autoResize(userInput);
//     showLoading();

//     try {
//         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 system_instruction: { parts: [{ text: systemInstruction }] },
//                 contents: history
//             })
//         });

//         const data = await response.json();

//         if (data.error) {
//             throw new Error(data.error.message);
//         }

//         const aiResponse = data.candidates[0].content.parts[0].text;
//         hideLoading();
//         addMessage('assistant', aiResponse);
//         history.push({ role: "model", parts: [{ text: aiResponse }] });
        
//         // Save conversation summary to sidebar (simulated)
//         updateSidebar(text);

//     } catch (error) {
//         hideLoading();
//         addMessage('assistant', `<span style="color: var(--error)">Error: ${error.message}</span>`);
//     }
// }

// function newChat() {
//     history = [];
//     chatContainer.innerHTML = '';
//     addMessage('assistant', "Hello! I'm SteveChat. How can I assist you today?");
//     updateStats();
// }

// function updateSidebar(firstMessage) {
//     const list = document.getElementById('history-list');
//     const item = document.createElement('div');
//     item.className = 'history-item';
//     item.innerText = firstMessage.substring(0, 30) + (firstMessage.length > 30 ? '...' : '');
//     item.onclick = () => alert('Persistence of history between sessions is not implemented in this single-file version.');
//     list.prepend(item);
// }

// function loadHistoryFromStorage() {
//     // Single-file version doesn't persist history between reloads for simplicity,
//     // but we start with a greeting.
//     newChat();
// }

// // Event Listeners
// userInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();
//         sendMessage();
//     }
// });




























































// State Management
let history = [];
let apiKey = localStorage.getItem('gemini_api_key') || '';
let isSidebarOpen = false;
const systemInstruction = "You are SteveChat, a helpful and intelligent AI assistant. Always use clean markdown for your responses. Keep your tone professional yet approachable.";

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const statsInfo = document.getElementById('stats-info');
const sidebar = document.getElementById('sidebar');

// Initialization
window.onload = () => {
    if (!apiKey) openSettings();
    loadHistoryFromStorage();
};

// UI Helpers
function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    sidebar.classList.toggle('active', isSidebarOpen);
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    sendBtn.disabled = textarea.value.trim() === '';
}

function openSettings() {
    document.getElementById('api-key-input').value = apiKey;
    document.getElementById('settings-modal').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function saveApiKey() {
    const key = document.getElementById('api-key-input').value.trim();
    if (key) {
        apiKey = key;
        localStorage.setItem('gemini_api_key', key);
        closeSettings();
    } else {
        alert('Please enter a valid API key.');
    }
}

function getApiKey() {
    const key = localStorage.getItem('gemini_api_key');
    if (!key) throw new Error('No API key provided.');
    return key;
}

function getTimestamp() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

// Markdown Parser (Simple Regex)
function parseMarkdown(text) {
    // Fenced code blocks
    text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
        const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<pre><code>${escapedCode}</code><button class="copy-btn" onclick="copyCode(this)">Copy</button></pre>`;
    });
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italics
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // New lines to br
    text = text.replace(/\n/g, '<br>');
    return text;
}

function copyCode(btn) {
    const code = btn.previousElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => btn.innerText = originalText, 2000);
    });
}

// Message Handling
function addMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role === 'user' ? 'user' : 'assistant'}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = role === 'user' ? text : parseMarkdown(text);
    
    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.innerText = getTimestamp();
    
    messageDiv.appendChild(bubble);
    messageDiv.appendChild(timestamp);
    chatContainer.appendChild(messageDiv);
    
    scrollToBottom();
    updateStats();
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function updateStats() {
    statsInfo.innerText = `${history.length} messages | SteveChat can make mistakes.`;
}

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'typing-indicator';
    loadingDiv.className = 'message assistant';
    loadingDiv.innerHTML = `<div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
    chatContainer.appendChild(loadingDiv);
    scrollToBottom();
}

function hideLoading() {
    const loader = document.getElementById('typing-indicator');
    if (loader) loader.remove();
}

// Core Functions
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text || !apiKey) return;

    if (!apiKey) {
        openSettings();
        return;
    }

    // User message
    addMessage('user', text);
    history.push({ role: "user", parts: [{ text }] });
    
    userInput.value = '';
    autoResize(userInput);
    showLoading();

    try {
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
        const key = getApiKey();

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': `${key}`
            },
            body: JSON.stringify({ contents: history })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            const msg = err.error?.message || `HTTP ${res.status}`;
            throw new Error(msg);
        }

        const data = await res.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiResponse) throw new Error('Empty response from Gemini.');
        hideLoading();
        addMessage('assistant', aiResponse);
        history.push({ role: "model", parts: [{ text: aiResponse }] });
        
        // Save conversation summary to sidebar (simulated)
        updateSidebar(text);

    } catch (error) {
        hideLoading();
        addMessage('assistant', `<span style="color: var(--error)">Error: ${error.message}</span>`);
    }
}

function newChat() {
    history = [];
    chatContainer.innerHTML = '';
    addMessage('assistant', "Hello! I'm SteveChat. How can I assist you today?");
    updateStats();
}

function updateSidebar(firstMessage) {
    const list = document.getElementById('history-list');
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerText = firstMessage.substring(0, 30) + (firstMessage.length > 30 ? '...' : '');
    item.onclick = () => alert('Persistence of history between sessions is not implemented in this single-file version.');
    list.prepend(item);
}

function loadHistoryFromStorage() {
    // Single-file version doesn't persist history between reloads for simplicity,
    // but we start with a greeting.
    newChat();
}

// Event Listeners
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

