const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = 3000;

app.post('/webhook', async (req, res) => {
    try {
        console.log('=== WEBHOOK RECEBIDO NO MEU SERVIDOR ===');
        const bodyData = req.body;
        const messageObj = bodyData.data || bodyData;

        const userMessage = messageObj.body || messageObj.text || messageObj.message;
        const senderPhone = messageObj.from || messageObj.sender || messageObj.chatId;
        const sessionName = bodyData.session || 'NERDWHATS_AMERICA';

        if (!userMessage || messageObj.fromMe) {
            console.log('Mensagem ignorada (vazia ou enviada por mim).');
            return res.status(200).json({ status: 'ignored' });
        }

        console.log(`De: ${senderPhone} | Mensagem: "${userMessage}"`);
        console.log('A enviar prompt para o Ollama...');

        // 1. Pergunta ao Ollama local
        const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
            model: 'qwen:0.5b',
            prompt: userMessage,
            stream: false
        });

        const aiReply = ollamaResponse.data.response || 'Desculpe, não consegui gerar uma resposta.';
        console.log(`Resposta da IA gerada: "${aiReply}"`);

        // 2. Envia a resposta de volta para o WhatsApp via WPPConnect (porta 21465)
        const wppApiUrl = `http://localhost:21465/api/${sessionName}/send-message`;
        
        await axios.post(wppApiUrl, {
            phone: senderPhone,
            message: aiReply
        }, {
            headers: {
                // Se o wppconnect exigir token aqui no envio para ele, colocamos, 
                // mas para RECEBER no teu servidor não precisas de nada!
            }
        });

        console.log('Resposta enviada com sucesso para o telemóvel!');
        return res.status(200).json({ status: 'success', response: aiReply });

    } catch (error) {
        console.error('ERRO NO PROCESSAMENTO:', error.message);
        return res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de webhook próprio a correr na porta ${PORT}`);
});