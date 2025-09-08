const slidesContainer = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let autoSlide;
let direction = 1; // 1 = indo pra frente, -1 = voltando

// Mostrar slide atual
function showSlide(index) {
  const slideWidth = slidesContainer.querySelector(".slide").offsetWidth;
  const gap = 20; // mesmo valor do CSS
  const offset = index * (slideWidth + gap);

  slidesContainer.style.transform = `translateX(-${offset}px)`;
}

// Próximo/Anterior automático (ping-pong)
function autoNext() {
  currentIndex += direction;

  if (currentIndex >= totalSlides - 1) {
    direction = -1; // chegou no fim, começa a voltar
  } else if (currentIndex <= 0) {
    direction = 1; // chegou no início, começa a ir pra frente
  }

  showSlide(currentIndex);
}

// Botão próximo (sempre vai pra frente, se puder)
function nextSlide() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    showSlide(currentIndex);
  }
}

// Botão anterior (sempre vai pra trás, se puder)
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  }
}

// Auto
function startAutoSlide() {
  stopAutoSlide(); // evita duplicar
  autoSlide = setInterval(autoNext, 7000); // troca a cada 7s
}

function stopAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
}

// Eventos
nextBtn.addEventListener("click", () => {
  nextSlide();
  startAutoSlide();
});

// Eventos do teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
    startAutoSlide(); // reinicia o auto-slide
  } else if (event.key === "ArrowLeft") {
    prevSlide();
    startAutoSlide(); // reinicia o auto-slide
  }
});


prevBtn.addEventListener("click", () => {
  prevSlide();
  startAutoSlide();
});

// Inicialização
showSlide(currentIndex);
startAutoSlide();

