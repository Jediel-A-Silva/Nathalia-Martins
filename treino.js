async function enviarMensagem() {
  const input = document.querySelector("#inputChat").value;

  const resposta = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const data = await resposta.json();
  document.querySelector("#respostaChat").innerText = data.reply;
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



// =====================
// Menu (único)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("ativo");
  });

  document.addEventListener("click", (e) => {
    if (menu.classList.contains("ativo") && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove("ativo");
    }
  });

  // torna a função acessível ao onclick do HTML
  window.fechar = function () {
    menu.classList.remove("ativo");
  };
});



// =====================
// IA - Abrir/Fechar Chat
// =====================
const toggleButton = document.querySelector(".ia-avatar");
toggleButton.setAttribute("aria-controls", "iaChat");
toggleButton.setAttribute("aria-expanded", "false");

toggleButton.addEventListener("click", toggleChat);
toggleButton.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.key === " ") toggleChat();
});

function toggleChat() {
  const chat = document.getElementById("iaChat");
  const input = document.getElementById("iaInput");
  const isOpen = chat.classList.toggle("ativo");
  toggleButton.setAttribute("aria-expanded", isOpen);
  chat.setAttribute("aria-hidden", !isOpen);

  const container = document.querySelector(".ia-container");
  container.classList.toggle("ativo", isOpen);

  if (isOpen) setTimeout(() => input.focus(), 300);
}

document.addEventListener("click", (e) => {
  const chat = document.getElementById("iaChat");
  const iaContainer = document.querySelector(".ia-container");

  if (
    chat.classList.contains("ativo") &&
    !chat.contains(e.target) &&
    !toggleButton.contains(e.target)
  ) {
    chat.classList.remove("ativo");
    chat.setAttribute("aria-hidden", "true");
    toggleButton.setAttribute("aria-expanded", "false");
    iaContainer.classList.remove("ativo");
  }
});

// =====================
// FormSubmit
// =====================
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);

    if (this.form) {
      this.url = this.form.getAttribute("action");
    }

    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch {
      this.displayError();
      throw new Error("Erro ao enviar o formulário, verifique a URL");
    }
  }

  init() {
    if (this.form) {
      this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada com sucesso!</h1>",
  error: "<h1 class='error'>Ops! Algo deu errado.</h1>",
});
formSubmit.init();

// =====================
// IA - Respostas
// =====================
const iaInput = document.getElementById("iaInput");
iaInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const texto = iaInput.value.trim();
    if (texto) {
      adicionarMensagemUsuario(texto);
      responderIA(texto.toLowerCase());
      iaInput.value = "";
    }
  }
});

function adicionarMensagemUsuario(texto) {
  const body = document.getElementById("iaBody");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>Você:</strong> ${texto}`;
  body.appendChild(msg);
}

function adicionarMensagemIA(texto) {
  const body = document.getElementById("iaBody");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>Nathalia:</strong> ${texto}`;
  body.appendChild(msg);
  body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
}

function responderIA(pergunta) {
  const respostas = new Map([
    [/início|home/, 'Volte para a <a href="index.html">página inicial</a>.'],
    [
      /pré-natal.*consulta|consulta.*pré-natal/,
      'Veja <a href="consulta-enfermagem.html">consulta pré-natal</a>.',
    ],
    [
      /educação|gestantes/,
      'Acesse <a href="educacao-gestantes.html">educação para gestantes</a>.',
    ],
    [
      /parto domiciliar/,
      'Veja <a href="parto-domiciliar.html">parto domiciliar</a>.',
    ],
    [
      /parto hospitalar/,
      'Veja <a href="parto-hospitalar.html">parto hospitalar</a>.',
    ],
   [
  /instagram/,
  'Veja nosso <a href="https://www.instagram.com/nathalia_enf.obstetra" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; background:#E1306C; color:white; padding:6px 10px; border-radius:8px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.7.4 3.9.7 3 .9 2.3 1.3 1.6 2 1 2.7.6 3.4.4 4.3.1 5.1 0 6.1 0 7.5.0 8.8 0 9.3 0 12s0 3.2.1 4.5c.1 1.3.3 2.3.6 3.1.2.9.6 1.6 1.2 2.3.7.7 1.4 1.1 2.3 1.3.8.3 1.8.5 3.1.6 1.3.1 1.8.1 4.5.1s3.2 0 4.5-.1c1.3-.1 2.3-.3 3.1-.6.9-.2 1.6-.6 2.3-1.2.7-.7 1.1-1.4 1.3-2.3.3-.8.5-1.8.6-3.1.1-1.3.1-1.8.1-4.5s0-3.2-.1-4.5c-.1-1.3-.3-2.3-.6-3.1-.2-.9-.6-1.6-1.2-2.3-.7-.7-1.4-1.1-2.3-1.3-.8-.3-1.8-.5-3.1-.6C15.2 0 14.7 0 12 0z"/><path d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2S8.6 18.2 12 18.2 18.2 15.4 18.2 12 15.4 5.8 12 5.8zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4c2.2 0 4 1.8 4 4s-1.8 4-4 4z"/><circle cx="18.4" cy="5.6" r="1.4"/></svg>Instagram</a>.'
],
    [
  /whatsapp/,
  'Fale com a gente no <a href="https://wa.me/551154519637" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; background:#25D366; color:white; padding:6px 10px; border-radius:5px;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M20.52 3.48C18.21 1.17 15.21 0 12 0 5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.25-1.63c1.73.95 3.68 1.46 5.75 1.46 6.63 0 12-5.37 12-12 0-3.21-1.17-6.21-3.48-8.52zM12 22c-1.82 0-3.59-.5-5.13-1.46l-.37-.22-3.71.97.99-3.62-.24-.38C2.56 15.63 2 13.85 2 12 2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93C20.96 6.82 22 9.33 22 12c0 5.52-4.48 10-10 10zm5.25-7.92c-.29-.14-1.71-.84-1.98-.93-.27-.1-.47-.14-.67.14s-.77.93-.94 1.11c-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.44-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.14-.14.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.19 0-.5.07-.77.36-.27.29-1.01.99-1.01 2.4 0 1.4 1.04 2.75 1.18 2.94.14.19 2.06 3.15 5 4.42.7.3 1.25.48 1.68.61.71.23 1.35.2 1.86.12.57-.09 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.13-.26-.21-.55-.36z"/></svg>WhatsApp</a>.'
],
    [
      /amamentação|aleitamento/,
      'Veja <a href="consultoria-aleitamento.html">consultoria de amamentação</a>.',
    ],
  ]);

  for (const [regex, resposta] of respostas) {
    if (regex.test(pergunta)) return adicionarMensagemIA(resposta);
  }
  adicionarMensagemIA("Desculpe, não encontrei uma resposta exata. 😊");
}

const slides = document.querySelector('.slides');
const slideWidth = slides.querySelector('img').offsetWidth;
let scrollPosition = 0;

// Duplicar slides no JS para loop suave
slides.innerHTML += slides.innerHTML;

function animate() {
  scrollPosition += 1; // velocidade (px por frame)
  if (scrollPosition >= slides.scrollWidth / 2) {
    scrollPosition = 0; // reinicia no início
  }
  slides.style.transform = `translateX(-${scrollPosition}px)`;
  requestAnimationFrame(animate);
}

animate();
