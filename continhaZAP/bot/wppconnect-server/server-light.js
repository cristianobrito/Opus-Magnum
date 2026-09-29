const wppconnect = require('@wppconnect-team/wppconnect');

const MEU_NUMERO_PESSOAL = '5521965576512@c.us';

const listaNegra = [
    /\.(online|store|tech|sex|bitcoin|bit|apostas|aposta)/i,
    /(8080|troca-de-senha|login-seguro|atualizar-cadastro)/i,
    /(sexo|bitcoin|ganhe-dinheiro)/i
];

wppconnect.create({
    session: 'teste',
    
    // ⬇️ A CORREÇÃO ESTÁ AQUI ⬇️
    whatsappVersion: '2.3000.1013710920-alpha',

    catchQR: (base64Qr, asciiQR) => {
        console.log('\n================================');
        console.log('📱 ESCANEIE O QR CODE');
        console.log('================================\n');
        console.log(asciiQR);
    },

    statusFind: (statusSession) => {
        console.log('🔄 Status da Sessão:', statusSession);
    },

    headless: 'new',
    useChrome: false,
    autoClose: 0,

    browserArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--no-first-run',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-software-rasterizer',
        '--disable-web-security'
    ],

    puppeteerOptions: {
        timeout: 180000,
        protocolTimeout: 180000
    }
})
.then(async (client) => {
    console.log('🛡️ Anjo Digital Online!');

    try {
        await client.sendText(MEU_NUMERO_PESSOAL, '✅ Anjo Digital iniciado com sucesso.');
        console.log('✅ Mensagem de teste enviada');
    } catch (erro) {
        console.log('⚠️ Não foi possível enviar a mensagem de teste');
        console.log(erro);
    }

    client.onMessage(async (message) => {
        if (message.fromMe) return;
        if (!message.body) return;

        const texto = message.body.toLowerCase();
        console.log(`💬 ${message.from}: ${texto}`);

        const ehPerigoso = listaNegra.some(regex => regex.test(texto));
        if (!ehPerigoso) return;

        console.log(`🚨 Conteúdo suspeito detectado: ${texto}`);

        try {
            await client.sendText(message.from, `❌ *ALERTA DE SEGURANÇA*\n\nO conteúdo abaixo parece suspeito:\n\n${texto}`);
            await client.sendText(MEU_NUMERO_PESSOAL, `🚨 *ALERTA*\n\nUsuário: ${message.sender?.pushname || 'Desconhecido'}\nMensagem: ${texto}`);
            console.log('✅ Alertas enviados');
        } catch (erro) {
            console.log('❌ Erro ao enviar alerta');
            console.log(erro);
        }
    });
})
.catch((erro) => {
    console.error('❌ ERRO AO INICIAR WPPCONNECT');
    console.error(erro);
    if (erro?.stack) {
        console.error('\nSTACK:\n');
        console.error(erro.stack);
    }
});