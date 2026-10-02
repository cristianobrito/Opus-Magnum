const express = require('express');
const router = express.Router();

// Rota POST para receber o Webhook do WhatsApp / WPPConnect
router.post('/webhook', async (req, res) => {
    try {
        const mensagemRecebida = req.body;
        
        console.log('--- NOVA MENSAGEM RECEBIDA NO WEBHOOK ---');
        console.log(JSON.stringify(mensagemRecebida, null, 2));

        // Aqui é onde faremos a ponte com o Ollama em breve!

        return res.status(200).json({ 
            status: 'success', 
            message: 'Webhook recebido com sucesso!' 
        });
    } catch (error) {
        console.error('Erro no webhook:', error);
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

module.exports = router;