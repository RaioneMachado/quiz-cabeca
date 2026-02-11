require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Rota teste
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

    console.log('Dados recebidos:', req.body);

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

    res.json({ success: true });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ success: false, error: 'Erro ao enviar email' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
