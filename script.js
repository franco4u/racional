const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

async function loadDatabase() {
    try {
        console.log('Tentando carregar database.json...'); // Adicionado para depuração
        const response = await fetch('database.json');
        console.log('Resposta do fetch:', response); // Adicionado para depuração
        if (!response.ok) {
            throw new Error(`Erro ao carregar database.json: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dados do database.json:', data); // Adicionado para depuração
        return data;
    } catch (error) {
        console.error('Erro ao carregar database.json:', error);
        return null;
    }
}

function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = ` ${sender}: ${message} `;
    chatLog.appendChild(messageDiv);
}

async function getBotResponse(userMessage) {
    const database = await loadDatabase();
    if (!database) {
        return 'Desculpe, ocorreu um erro ao carregar o banco de dados.';
    }

    userMessage = userMessage.toLowerCase();

    for (const category in database) {
        if (category !== 'fallback') {
            for (const question of database[category].perguntas) {
                if (userMessage.includes(question)) {
                    return database[category].respostas[Math.floor(Math.random() * database[category].respostas.length)];
                }
            }
        }
    }

    return database.fallback.respostas[Math.floor(Math.random() * database.fallback.respostas.length)];
}

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    appendMessage(userMessage, 'VOCÊ');
    userInput.value = '';

    const botResponse = await getBotResponse(userMessage);
    appendMessage(botResponse, 'Sr.MANOEL');




});
