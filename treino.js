// =====================
// Enviar Mensagem Chat
// =====================
async function enviarMensagem() {
  const input = document.querySelector("#inputChat");
  if (!input || !input.value.trim()) return;

  const resposta = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }) // 🔹 alterado de "message" para "text"
  });

  const data = await resposta.json();
  const respostaChat = document.querySelector("#respostaChat");
  if (respostaChat) respostaChat.innerText = data.reply || "Desculpe, não entendi.";
}


// =====================
// Swiper
// =====================
const swiper = new Swiper(".my-carousel", {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 16,
  loop: true,
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
});

// =====================
// Menu
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("ativo");
    });

    document.addEventListener("click", (e) => {
      if (menu.classList.contains("ativo") && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove("ativo");
      }
    });

    window.fechar = function () {
      menu.classList.remove("ativo");
    };
  }
});

// =====================
// IA - Abrir/Fechar Chat + Envio para Botpress Cloud
// =====================
const toggleButton = document.querySelector(".ia-avatar");
const chatContainer = document.getElementById("iaChat");
const chatInput = document.getElementById("iaInput");
const chatBody = document.getElementById("iaBody");
const iaContainer = document.querySelector(".ia-container");

if (toggleButton && chatContainer && chatInput && chatBody && iaContainer) {
  toggleButton.setAttribute("aria-controls", "iaChat");
  toggleButton.setAttribute("aria-expanded", "false");

  toggleButton.addEventListener("click", toggleChat);
  toggleButton.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") toggleChat();
  });

  function toggleChat() {
    const isOpen = chatContainer.classList.toggle("ativo");
    toggleButton.setAttribute("aria-expanded", isOpen);
    chatContainer.setAttribute("aria-hidden", !isOpen);
    iaContainer.classList.toggle("ativo", isOpen);

    if (isOpen) setTimeout(() => chatInput.focus(), 300);
  }

  document.addEventListener("click", (e) => {
    if (chatContainer.classList.contains("ativo") && !chatContainer.contains(e.target) && !toggleButton.contains(e.target)) {
      chatContainer.classList.remove("ativo");
      chatContainer.setAttribute("aria-hidden", "true");
      toggleButton.setAttribute("aria-expanded", "false");
      iaContainer.classList.remove("ativo");
    }
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const texto = chatInput.value.trim();
      if (!texto) return;
      adicionarMensagemUsuario(texto);
      enviarParaBotpress(texto);
      chatInput.value = "";
    }
  });

  function adicionarMensagemUsuario(texto) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>Você:</strong> ${texto}`;
    chatBody.appendChild(msg);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }

  function adicionarMensagemIA(texto) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>Nathalia:</strong> ${texto}`;
    chatBody.appendChild(msg);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }

async function enviarParaBotpress(pergunta) {
  try {
    const resposta = await fetch("http://localhost:5000/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: pergunta })
});


    const data = await resposta.json();
    const botReply = data.responses?.[0]?.payload?.text || "Desculpe, não entendi.";
    adicionarMensagemIA(botReply);
  } catch (error) {
    adicionarMensagemIA("Erro ao conectar com a IA. Tente novamente mais tarde.");
    console.error("Erro Botpress:", error);
  }
}
}

// =====================
// FormSubmit
// =====================
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);

    if (this.form && this.formButton) {
      this.url = this.form.getAttribute("action");
      this.sendForm = this.sendForm.bind(this);
      this.formButton.addEventListener("click", this.sendForm);
    }
  }

  displaySuccess() { this.form.innerHTML = this.settings.success; }
  displayError() { this.form.innerHTML = this.settings.error; }

  getFormObject() {
    const obj = {};
    this.form.querySelectorAll("[name]").forEach(f => obj[f.name] = f.value);
    return obj;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(this.getFormObject())
      });
      this.displaySuccess();
    } catch {
      this.displayError();
      console.error("Erro ao enviar o formulário");
    }
  }
}

// Inicializa FormSubmit
new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada com sucesso!</h1>",
  error: "<h1 class='error'>Ops! Algo deu errado.</h1>"
});

// =====================
// Carrossel Principal
// =====================
(function() {
  const slides = document.querySelectorAll(".slide-item");
  const prevBtn = document.querySelector(".prev-custom");
  const nextBtn = document.querySelector(".next-custom");
  const textoBox = document.querySelector(".descricao-carrossel");

  if (!slides.length || !prevBtn || !nextBtn || !textoBox) return;

  const textos = [
    { titulo: "Parto Humanizado com Respeito", descricao: "Acolhimento em cada etapa..." },
    { titulo: "Gestante como Protagonista", descricao: "Você no centro das decisões..." },
    { titulo: "Acolhimento e Confiança", descricao: "Um ambiente seguro e acolhedor..." },
    { titulo: "Cuidado Integral com a Gestante", descricao: "Assistência completa..." },
    { titulo: "Experiência Única no Parto", descricao: "Vivencie o nascimento..." },
    { titulo: "Amor e Segurança no Nascer", descricao: "Cada momento do parto é pensado..." }
  ];

  let index = 0;
  function atualizar() {
    slides.forEach((slide, i) => slide.classList.toggle("ativo-slide", i === index));
    textoBox.querySelector("h2").innerText = textos[index].titulo;
    textoBox.querySelector("p").innerText = textos[index].descricao;
  }

  nextBtn.addEventListener("click", () => { index = (index + 1) % slides.length; atualizar(); });
  prevBtn.addEventListener("click", () => { index = (index - 1 + slides.length) % slides.length; atualizar(); });

  atualizar();
})();

// =====================
// Carrossel Final da Página
// =====================
(function() {
  const slides = document.querySelectorAll("#carrosselFinal .slide-final");
  const prevBtn = document.querySelector("#carrosselFinal .prev-final");
  const nextBtn = document.querySelector("#carrosselFinal .next-final");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;
  function atualizar() {
    slides.forEach((slide, i) => slide.classList.toggle("ativo-slide-final", i === index));
  }

  nextBtn.addEventListener("click", () => { index = (index + 1) % slides.length; atualizar(); });
  prevBtn.addEventListener("click", () => { index = (index - 1 + slides.length) % slides.length; atualizar(); });

  atualizar();
})();
