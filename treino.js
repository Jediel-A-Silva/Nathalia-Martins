// --- Swiper ---
const swiper = new Swiper('.my-carousel', {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  touchRatio: 1,
  freeMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});




// --- Menu Hambúrguer ---
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// --- Toggle Button IA ---
const toggleButton = document.querySelector('.ia-avatar');

// --- Esconder o chat ao carregar ---
window.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('iaChat');
  if (chat) {
    chat.style.display = 'none';
    chat.setAttribute('aria-hidden', 'true');
    chat.inert = true;
    toggleButton?.setAttribute('aria-expanded', 'false');
  }
});

// --- Toggle chat assistente virtual ---
window.toggleChat = function () {
  const chat = document.getElementById('iaChat');
  const input = document.getElementById('iaInput');
  const isCurrentlyVisible = chat.style.display === 'block';

  if (isCurrentlyVisible) {
    chat.style.display = 'none';
    chat.setAttribute('aria-hidden', 'true');
    chat.inert = true;
    toggleButton.setAttribute('aria-expanded', 'false');
  } else {
    chat.style.display = 'block';
    chat.setAttribute('aria-hidden', 'false');
    chat.inert = false;
    setTimeout(() => input?.focus(), 300);
    toggleButton.setAttribute('aria-expanded', 'true');
  }
};

// --- Acessibilidade e clique IA ---
if (toggleButton) {
  toggleButton.setAttribute('aria-controls', 'iaChat');
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('role', 'button');
  toggleButton.setAttribute('tabindex', '0');

  toggleButton.addEventListener('click', () => {
    toggleChat();
  });

  toggleButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChat();
    }
  });
}


// --- Funções para mensagens ---
function adicionarMensagemUsuario(texto) {
  const body = document.getElementById('iaBody');
  const msg = document.createElement('p');
  msg.innerHTML = `<strong>Você:</strong> ${texto}`;
  body.appendChild(msg);
}

function adicionarMensagemIA(texto) {
  const body = document.getElementById('iaBody');
  const msg = document.createElement('p');
  msg.innerHTML = `<strong>Nathalia:</strong> ${texto}`;
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}

// --- Resposta automática da IA ---
const iaInput = document.getElementById("iaInput");
iaInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const texto = iaInput.value.trim();
    if (texto !== "") {
      adicionarMensagemUsuario(texto);
      responderIA(texto.toLowerCase());
      iaInput.value = "";
    }
  }
});

function responderIA(pergunta) {
  let resposta = "";

  if (pergunta.includes("início") || pergunta.includes("home")) {
    resposta = 'Você pode voltar para a <a href="index.html">página inicial</a>.';
  } else if (pergunta.includes("pré-natal") && pergunta.includes("consulta")) {
    resposta = 'Veja sobre <a href="consulta-enfermagem.html">consulta de pré-natal com enfermeira</a>.';
  } else if (pergunta.includes("educação") || pergunta.includes("gestantes")) {
    resposta = 'Acesse <a href="educacao-gestantes.html">educação para gestantes</a>.';
  } else if (pergunta.includes("trabalho de parto") || pergunta.includes("humanizado")) {
    resposta = 'Veja sobre <a href="prenatal-humanizado.html">assistência de trabalho de parto</a>.';
  } else if (pergunta.includes("parto domiciliar")) {
    resposta = 'Aqui está a página de <a href="parto-domiciliar.html">parto domiciliar</a>.';
  } else if (pergunta.includes("parto hospitalar")) {
    resposta = 'Saiba mais sobre <a href="parto-hospitalar.html">parto hospitalar</a>.';
  } else if (pergunta.includes("pós-parto") || pergunta.includes("puerpério")) {
    resposta = 'Veja o <a href="puerperio-amamentacao.html">acompanhamento do puerpério</a>.';
  } else if (pergunta.includes("amamentação") || pergunta.includes("aleitamento")) {
    resposta = 'Veja a <a href="consultoria-aleitamento.html">consultoria de amamentação</a>.';
  } else if (pergunta.includes("acompanhamento") && pergunta.includes("pós")) {
    resposta = 'Acesse o <a href="acompanhamento-posparto.html">acompanhamento pós-parto</a>.';
  } else if (pergunta.includes("atendimento domiciliar")) {
    resposta = 'Confira sobre <a href="atendimento-domiciliar.html">atendimento domiciliar</a>.';
  } else if (pergunta.includes("feridas") || pergunta.includes("curativos")) {
    resposta = 'Veja o <a href="tratamento-feridas.html">tratamento de feridas</a>.';
  } else if (pergunta.includes("ginecologia")) {
    resposta = 'Veja sobre <a href="assistencia-ginecologia.html">assistência em ginecologia</a>.';
  } else {
    resposta = "Desculpe, não encontrei uma resposta exata. Você pode usar o menu acima ou reformular a pergunta. 😊";
  }

  adicionarMensagemIA(resposta);
}
function enviarSugestao(texto) {
  adicionarMensagemUsuario(texto);
  responderIA(texto.toLowerCase());
}
