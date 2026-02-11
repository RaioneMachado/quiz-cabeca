import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { nome, resposta1, resposta2, email } = req.body;

    await resend.emails.send({
      from: "Funil <onboarding@resend.dev>",
      to: "SEUEMAIL@DOMINIO.COM",
      subject: "Novo lead do funil",
      html: `
        <h2>Novo Lead</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Resposta 1:</strong> ${resposta1}</p>
        <p><strong>Resposta 2:</strong> ${resposta2}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao enviar email" });
  }
}
