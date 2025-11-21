// Elementos DOM
const slidesContainer = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Variáveis
let currentIndex = 0;
let autoSlide;
let direction = 1; // 1 = indo pra frente, -1 = voltando

// Função para mostrar slide atual
function showSlide(index) {
  const slides = slidesContainer.querySelectorAll(".slide");
  if (!slides.length) return;

  // Corrige index
  if (index < 0) index = 0;
  if (index > slides.length - 1) index = slides.length - 1;
  currentIndex = index;

  // Calcula offset considerando marginRight
  const slide = slides[0];
  const slideStyle = window.getComputedStyle(slide);
  const slideWidth = slide.offsetWidth;
  const gap = parseInt(slideStyle.marginRight) || 0;
  const offset = currentIndex * (slideWidth + gap);

  slidesContainer.style.transform = `translateX(-${offset}px)`;
}

// Próximo/Anterior automático (ping-pong)
function autoNext() {
  const slides = slidesContainer.querySelectorAll(".slide");
  if (!slides.length) return;

  currentIndex += direction;
  if (currentIndex >= slides.length - 1) direction = -1;
  if (currentIndex <= 0) direction = 1;

  showSlide(currentIndex);
}

// Próximo e anterior (botões)
function nextSlide() {
  const slides = slidesContainer.querySelectorAll(".slide");
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    showSlide(currentIndex);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  }
}

// Auto-slide
function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(autoNext, 7000); // troca a cada 7s
}

function stopAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
}

// Eventos dos botões
nextBtn.addEventListener("click", () => {
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  startAutoSlide();
});

// Eventos do teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
    startAutoSlide();
  } else if (event.key === "ArrowLeft") {
    prevSlide();
    startAutoSlide();
  }
});

// Inicialização
showSlide(currentIndex);
startAutoSlide();
