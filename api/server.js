require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando 🚀');
});

// Rota para receber dados do quiz
app.post('/enviar', async (req, res) => {
  try {
    const {
      nome,
      email,
      telefone,
      pergunta1,
      pergunta2,
      pergunta3,
      pergunta4,
      pergunta5
    } = req.body;

    console.log('📩 Dados recebidos:', req.body);

    // Validação mínima
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email é obrigatório' });
    }

    await resend.emails.send({
      from: 'Funil <onboarding@resend.dev>',
      to: 'notasepartituras744@gmail.com',
      subject: '🔥 Novo Lead do Funil',
      html: `
        <h2>Novo Lead Recebido</h2>
        <p><strong>Nome:</strong> ${nome || 'Não informado'}</p>
        <p><strong>Email:</strong> ${email || 'Não informado'}</p>
        <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
        <hr>
        <p><strong>Pergunta 1:</strong> ${pergunta1 || 'Não informado'}</p>
        <p><strong>Pergunta 2:</strong> ${pergunta2 || 'Não informado'}</p>
        <p><strong>Pergunta 3:</strong> ${pergunta3 || 'Não informado'}</p>
        <p><strong>Pergunta 4:</strong> ${pergunta4 || 'Não informado'}</p>
        <p><strong>Pergunta 5:</strong> ${pergunta5 || 'Não informado'}</p>
      `
    });

    console.log('✅ Email enviado com sucesso');

    return res.json({ success: true });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return res.status(500).json({ success: false, error: 'Erro ao enviar email' });
  }
});

// Porta (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
