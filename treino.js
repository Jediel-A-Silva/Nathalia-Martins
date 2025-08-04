// Swiper
const swiper = new Swiper('.my-carousel', {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

// Menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// IA
const toggleButton = document.querySelector('.ia-avatar');
toggleButton.setAttribute('aria-controls', 'iaChat');
toggleButton.setAttribute('aria-expanded', 'false');

toggleButton.addEventListener('click', toggleChat);
toggleButton.addEventListener('keypress', e => {
  if (e.key === 'Enter' || e.key === ' ') toggleChat();
});

function toggleChat() {
  const chat = document.getElementById('iaChat');
  const input = document.getElementById('iaInput');
  const isOpen = chat.classList.toggle('ativo');
  toggleButton.setAttribute('aria-expanded', isOpen);
  chat.setAttribute('aria-hidden', !isOpen);

  // Adiciona ou remove classe "ativo" no container
  const container = document.querySelector('.ia-container');
  container.classList.toggle('ativo', isOpen);

  if (isOpen) setTimeout(() => input.focus(), 300);
}

document.addEventListener('click', e => {
  // Fecha menu
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.style.display = 'none';
  }

  // Fecha chat
  const chat = document.getElementById('iaChat');
  const iaContainer = document.querySelector('.ia-container');
  if (
    chat.classList.contains('ativo') &&
    !chat.contains(e.target) &&
    !toggleButton.contains(e.target)
  ) {
    chat.classList.remove('ativo');
    chat.setAttribute('aria-hidden', 'true');
    toggleButton.setAttribute('aria-expanded', 'false');
    iaContainer.classList.remove('ativo');
  }
});


// IA resposta
const iaInput = document.getElementById('iaInput');
iaInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const texto = iaInput.value.trim();
    if (texto) {
      adicionarMensagemUsuario(texto);
      responderIA(texto.toLowerCase());
      iaInput.value = '';
    }
  }
});

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
  body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}

function responderIA(pergunta) {
  const respostas = new Map([
    [/início|home/, 'Volte para a <a href="index.html">página inicial</a>.'],
    [/pré-natal.*consulta|consulta.*pré-natal/, 'Veja <a href="consulta-enfermagem.html">consulta pré-natal</a>.'],
    [/educação|gestantes/, 'Acesse <a href="educacao-gestantes.html">educação para gestantes</a>.'],
    [/parto domiciliar/, 'Veja <a href="parto-domiciliar.html">parto domiciliar</a>.'],
    [/parto hospitalar/, 'Veja <a href="parto-hospitalar.html">parto hospitalar</a>.'],
    [/amamentação|aleitamento/, 'Veja <a href="consultoria-aleitamento.html">consultoria de amamentação</a>.']
  ]);

  for (const [regex, resposta] of respostas) {
    if (regex.test(pergunta)) return adicionarMensagemIA(resposta);
  }
  adicionarMensagemIA("Desculpe, não encontrei uma resposta exata. 😊");
}
