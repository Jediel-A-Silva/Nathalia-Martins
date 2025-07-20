// Inicializa o Swiper com efeito padrão (slide) e sem autoplay
const swiper = new Swiper('.my-carousel', {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Controle do menu hambúrguer
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// Toggle do chat da assistente virtual
function toggleChat() {
  const chat = document.getElementById('iaChat');
  const isVisible = chat.style.display === 'block';
  chat.style.display = isVisible ? 'none' : 'block';
  chat.setAttribute('aria-hidden', isVisible);
}