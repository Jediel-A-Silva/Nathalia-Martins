/* ============================================
   IA Nathalia - versão v9.5 integrada ao n8n
   ============================================ */

const IA_VERSION = "v9.5";
const SELECTORS = {
  input: ["#inputChat", "#iaInput", "[data-ia-input]"],
  sendBtn: ["#iaSend", ".ia-send-btn", "[data-ia-send]"],
  chatBody: ["#respostaChat", "#iaBody", "[data-ia-body]"],
  toggle: [".ia-avatar", "[data-ia-toggle]"],
  container: ["#iaChat", ".ia-container", "[data-ia-container]"]
};

/* ============================
   Funções auxiliares
   ============================ */
function findFirst(selectors) {
  for (const s of selectors) {
    const el = document.querySelector(s);
    if (el) return el;
  }
  return null;
}
function safeText(v) {
  return String(v ?? "");
}
function escapeHtml(str = "") {
  return safeText(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ============================
   Estado do chat
   ============================ */
const ChatState = {
  version: IA_VERSION,
  conversation: [],
  isProcessing: false
};
function pushMessage(role, text) {
  ChatState.conversation.push({ role, text: safeText(text), time: new Date() });
}

/* ============================
   Renderização das mensagens
   ============================ */
function renderUserMessage(text) {
  const chatBodyEl = findFirst(SELECTORS.chatBody);
  if (!chatBodyEl) return;
  const block = document.createElement("div");
  block.className = "ia-msg ia-user";
  block.innerHTML = `
    <div class="ia-msg-bubble ia-user-bubble">
      <strong>Você:</strong>
      <div class="ia-msg-text">${escapeHtml(text)}</div>
    </div>`;
  chatBodyEl.appendChild(block);
  chatBodyEl.scrollTo({ top: chatBodyEl.scrollHeight, behavior: "smooth" });
}

function renderAssistantMessage(htmlText) {
  const chatBodyEl = findFirst(SELECTORS.chatBody);
  if (!chatBodyEl) return;
  const block = document.createElement("div");
  block.className = "ia-msg ia-assistant";
  block.innerHTML = `
    <div class="ia-msg-bubble ia-assistant-bubble">
      <strong>Nathalia:</strong>
      <div class="ia-msg-text">${htmlText}</div>
    </div>`;
  chatBodyEl.appendChild(block);
  chatBodyEl.scrollTo({ top: chatBodyEl.scrollHeight, behavior: "smooth" });
}

/* ============================
   Comunicação com o n8n
   ============================ */
async function processMessage(rawText) {
  try {
    if (ChatState.isProcessing) return;
    const text = safeText(rawText).trim();
    if (!text) return;

    ChatState.isProcessing = true;
    pushMessage("user", text);
    renderUserMessage(text);

    try {
  // 🌐 URL DO WEBHOOK NA NUVEM (n8n.cloud)
  const response = await fetch("https://nerddaprogramacao.app.n8n.cloud/webhook/agent-nathalia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensagem: text })
  });

  if (!response.ok) throw new Error("Erro ao se comunicar com o n8n.");

  const data = await response.json();

  // 💬 Ajuste conforme o retorno do seu nó "Code" no n8n
  const reply =
    data.resposta ||
    data.mensagem ||
    "🤖 A Nathalia não respondeu agora, tente novamente.";

  renderAssistantMessage(reply);

} catch (err) {
  console.error("Erro:", err);
  renderAssistantMessage("⚠️ Ocorreu um erro interno. Tente novamente mais tarde.");
} finally {
  ChatState.isProcessing = false;
}


/* ============================
   Inicialização de eventos
   ============================ */
function initBindings() {
  const input = findFirst(SELECTORS.input);
  const sendBtn = findFirst(SELECTORS.sendBtn);
  const container = findFirst(SELECTORS.container);
  const toggle = findFirst(SELECTORS.toggle);

  const enviar = async () => {
    if (!input) return;
    const texto = input.value.trim();
    if (!texto) {
      input.classList.add("ia-input-empty");
      setTimeout(() => input.classList.remove("ia-input-empty"), 300);
      return;
    }
    input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
    try {
      await processMessage(texto);
    } finally {
      input.value = "";
      input.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
    }
  };

  if (sendBtn) {
    const newBtn = sendBtn.cloneNode(true);
    sendBtn.parentNode.replaceChild(newBtn, sendBtn);
    newBtn.addEventListener("click", (e) => {
      e.preventDefault();
      enviar();
    });
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviar();
      }
    });
  }

  if (toggle && container) {
    toggle.addEventListener("click", () => {
      const isOpen = container.classList.toggle("ativo");
      toggle.setAttribute("aria-expanded", isOpen);
      if (isOpen && input) setTimeout(() => input.focus(), 200);
    });
  }
}

/* ============================
   Inicialização principal
   ============================ */
function init() {
  initBindings();
  window.IA_NATHALIA = {
    version: IA_VERSION,
    state: ChatState,
    send: (text) => processMessage(text),
    renderAssistantMessage
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

/* ============================
   Estilos básicos (inline)
   ============================ */
(function injectStyles() {
  if (document.getElementById("ia-style-v9")) return;
  const s = document.createElement("style");
  s.id = "ia-style-v9";
  s.innerHTML = `
    .ia-msg { margin: 8px 12px; display:block; clear:both; }
    .ia-msg-bubble { padding:10px 12px; border-radius:12px; max-width:90%; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
    .ia-user { text-align:right; }
    .ia-user-bubble { background: linear-gradient(90deg,#fdf1f4,#fff); margin-left:auto; display:inline-block; }
    .ia-assistant-bubble { background:#f6f8ff; margin-right:auto; display:inline-block; }
    .ia-msg-text { margin-top:6px; white-space:pre-wrap; }
    .ia-input-empty { animation: ia-shake .25s linear; border-color:#e91e63; }
    @keyframes ia-shake {
      0%{ transform:translateX(0) } 
      25%{ transform:translateX(-4px) }
      50%{ transform:translateX(4px) } 
      75%{ transform:translateX(-4px) }
      100%{ transform:translateX(0) }
    }
  `;
  document.head.appendChild(s);
})(); // 👈 Aqui fecha a função corretamente
