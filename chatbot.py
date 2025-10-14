from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

# =====================
# Configurações Flask
# =====================
app = Flask(__name__)
CORS(app)  # Permite requisições do frontend (localhost)

# =====================
# Configuração OpenAI
# =====================
HF_TOKEN = os.environ.get("HF_TOKEN")
if not HF_TOKEN:
    raise ValueError("É necessário definir a variável de ambiente HF_TOKEN")

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=HF_TOKEN,
)

# =====================
# Rota /chat
# =====================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"reply": "Por favor, envie uma mensagem válida."})

    try:
        completion = client.chat.completions.create(
            model="moonshotai/Kimi-K2-Instruct",
            messages=[{"role": "user", "content": user_message}],
        )
        resposta = completion.choices[0].message.content
        return jsonify({"reply": resposta})
    except Exception as e:
        print("Erro ao chamar API:", e)
        return jsonify({"reply": "Desculpe, ocorreu um erro ao processar sua mensagem."}), 500

# =====================
# Executar servidor
# =====================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
