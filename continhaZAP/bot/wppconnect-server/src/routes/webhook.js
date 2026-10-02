const { Router } = require('express');

const router = Router();

router.post('/webhook', async (req, res) => {
    try {
        console.log('--- NOVA MENSAGEM RECEBIDA NO WEBHOOK ---');
        console.log(JSON.stringify(req.body, null, 2));

        // Extrai o texto da mensagem (ajustaremos o caminho exato conforme o payload do WPPConnect)
        // Por enquanto, aceitamos uma propriedade 'message', 'text' ou o corpo genérico
        const userMessage = req.body.message || req.body.text || req.body.teste || 'Olá';

        console.log(`Enviando para o Ollama: "${userMessage}"`);

        // Fazendo a requisição HTTP para o Ollama local
        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'qwen:0.5b',
                prompt: userMessage,
                stream: false // Recebe a resposta completa de uma vez só
            })
        });

        if (!ollamaResponse.ok) {
            throw new Error(`Erro na API do Ollama: ${ollamaResponse.statusText}`);
        }

        const ollamaData = await ollamaResponse.json();
        const aiReply = ollamaData.response || 'Sem resposta da IA.';

        console.log(`Resposta do Ollama: "${aiReply}"`);

        return res.status(200).json({
            status: 'success',
            user_message: userMessage,
            ai_response: aiReply
        });

    } catch (error) {
        console.error('Erro ao processar o webhook ou comunicar com o Ollama:', error.message);
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;