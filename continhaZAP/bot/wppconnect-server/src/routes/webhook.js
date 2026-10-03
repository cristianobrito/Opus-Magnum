const { Router } = require('express');
const axios = require('axios');

const router = Router();

// ===== CONFIGURAÇÕES =====
const API_TOKEN = '$2b$10$JhZte0WU19PAw4gglEufc.ShZiOs8CzVCTUYvPWhUfSsa0HG5TdiO';
const SESSION_NAME = 'NERDWHATS_AMERICA';
const WPP_API_URL = 'http://localhost:21465';
const OLLAMA_URL = 'http://localhost:11434';
const OLLAMA_MODEL = 'qwen:0.5b';

// ===== WEBHOOK =====
router.post('/webhook', async (req, res) => {
    try {
        const bodyData = req.body;
        const messageObj = bodyData.data || bodyData;

        const userMessage = messageObj.body || messageObj.text || messageObj.content;
        const senderPhone = messageObj.from || messageObj.to;
        const fromMe = messageObj.fromMe;

        // Se for um evento sem texto (como presença, status, etc.), respondemos logo sem poluir o terminal
        if (!userMessage) {
            return res.status(200).json({ status: 'ignored_no_text' });
        }

        // Se foi enviado por ti, ignoramos para evitar loops
        if (fromMe) {
            return res.status(200).json({ status: 'ignored_from_me' });
        }

        // A partir daqui, SÓ APARECE NO TERMINAL se for uma mensagem real de texto de alguém!
        console.log('=== MENSAGEM REAL RECEBIDA ===');
        console.log(`💬 De: ${senderPhone} | Mensagem: "${userMessage}"`);
        console.log('🧠 A enviar prompt para o Ollama...');

        // ===== 1. Perguntar ao Ollama =====
        const ollamaResponse = await axios.post(
            `${OLLAMA_URL}/api/generate`,
            {
                model: OLLAMA_MODEL,
                prompt: userMessage,
                stream: false
            }
        );

        const aiReply = ollamaResponse.data.response || 'Desculpe, não consegui gerar uma resposta.';
        console.log(`🤖 Resposta da IA: "${aiReply}"`);

        // ===== 2. Enviar a resposta de volta para o WhatsApp =====
        const wppApiUrl = `${WPP_API_URL}/api/${SESSION_NAME}/send-message`;
        
        await axios.post(
            wppApiUrl,
            {
                phone: senderPhone,
                message: aiReply
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Resposta enviada com sucesso para o WhatsApp!');

        return res.status(200).json({
            status: 'success',
            response: aiReply
        });

    } catch (error) {
        console.error('❌ ERRO NO WEBHOOK:', error.message);
        return res.status(200).json({ status: 'error', message: error.message });
    }
});

module.exports = router;