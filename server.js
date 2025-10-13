import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

// Carrega as variáveis do .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Pega o token e o ID do bot do .env
const BOT_TOKEN = process.env.BOTPRESS_TOKEN;
const BOT_ID = process.env.BOT_ID;

// =====================
// Rota que o seu frontend vai chamar
// =====================
app.post("/chat", async (req, res) => {
  try {
    const resposta = await fetch("https://api.botpress.cloud/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BOT_TOKEN}`,
      },
      body: JSON.stringify({
        botId: BOT_ID,
        type: "text",
        text: req.body.text,
        user: "usuario-frontend",
      }),
    });

    const contentType = resposta.headers.get("content-type");
    const data = contentType && contentType.includes("application/json")
      ? await resposta.json()
      : await resposta.text();

    res.json(data);
  } catch (error) {
    console.error("❌ Erro ao conectar ao Botpress:", error);
    res.status(500).json({ error: "Erro ao conectar ao Botpress" });
  }
});

// =====================
// Inicializa o servidor
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
