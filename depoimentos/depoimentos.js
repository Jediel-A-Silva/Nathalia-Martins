const data = [
  {
    img: "img/thalitavieira.jpg",
    text: `Muito obrigada por tanto, Naty! Eu jamais vou esquecer o que vivemos e quão importante foi ter o seu apoio pra chegada do Murillo! 💚🦊`,
    name: "Thalita Vieira"
  },
  {
    img: "img/nathaliakouch.jpg",
    class: "foto-kouch",
    text: `Gatissima, vc faz um trabalho incrivel! E sempre que eu tive qq dúvida inclusive antes e depois do parto vc estava la esclarecendo e me acalmando com td paciencia e carinho. Muito loka quem diz que tu não é humana. Serei sempre grata a vc ❤️ De fato quem puder ir com equipe propria é o melhor dos mundos. Me senti acolhida. E msm que tenha ido pra cesárea, eu fui muito segura de que foi pq precisava msm, e vc quem me deu essa segurança.`,
    name: "Natalia Mitie Kouchi"
  },
  {
    img: "img/marcela.jpeg",
    text: `Queria te agradecer demais por todo suporte que me deu no meu TP Você é incrível e foi única comigo Sei que deve ouvir isso muitas vezes rsrs (merecido) porém vc é incrível e saiba do seu valor Se todos as enf fossem assim como vc estaríamos vivendo um mundo de partos melhor Você fez a diferença naquele dia pra mim Muito obrigada ❤️ Desejo muita luz em seu caminho e que todas grávidas possam ter o prazer de te conhecer 🫶 Grande abraço e bom domingo`,
    name: "Marcela"
  },
  {
    img: "img/carolrenan.png",
    text: `Naaaati, incrível ter você com a gente em dois momentos tão incríveis da nossa vida! A nossa família é muito sua fã! ❤️`,
    name: "Carol Matern e Renan"
  },
  {
    img: "img/brunarossetto.jpg",
    text: `Oiiii Nath! Tudo bem? Passando para te agradecer por tudo o que você fez por mim e pela minha família 🥹🫶 Que experiência indescritível e intensa! Você teve um papel importantíssimo no dia mais incrível da minha vida. Você é um ser iluminado, te agradeço pela força, pelo olhar de segurança, por tentar ao máximo com que eu conseguisse com segurança um parto normal 🫶 Por me chamar de deusa parideira, frase poderosa, igual a você! Obrigada obrigada obrigada! ❤️🫶🥹💪🏼`,
    name: "Bruna Rosetto"
  },
  {
    img: "img/danielle.jpeg",
    text: `De verdade, eu só consegui porque você me deu um apoio incrível, incontáveis vezes eu falo bem de você, da sua paciência, do seu carinho... A forma que me olhava, eu nunca vou me esquecer do seu rosto, do seu olhar... Fora que foi minha anja, pois percebeu que meu inchaço não estava normal🩷`,
    name: "Danielle Da Silva Santos"
  },
  {
    img: "img/leticia.jpg",
    text: `Eu já estava desconfortável com meu pré-natal, e encontrar vocês foi o nosso maior acerto. Você abraçou nossa gestação, nossa família. Senti sua admiração o tempo todo por mim. Você é competente, tem um olhar único e uma sensibilidade que me surpreendeu. Foi muito especial quando, mesmo sendo cristã, perguntou se eu queria cantiga ou fio do candomblé. Me senti respeitada, valorizada por ser quem eu sou, com a minha fé e a minha história. Estou encantada com a magia do dia 15/10. Obrigada, Nath! 🥹❤`,
    name: "Leticía Fialho"
  }
];


const track = document.querySelector(".carousel-track");
const dotsContainer = document.querySelector(".dots");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;

/* ===== Criar slides e bolinhas ===== */
data.forEach(() => {
  const dot = document.createElement("span");
  dotsContainer.appendChild(dot);
});

data.forEach(item => {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.innerHTML = `
    <div class="card">
      <div class="card-content">
        <img src="${item.img}">
        <div class="text-area">
          <p>${item.text}</p>
          <div class="stars">★★★★★</div>
          <h3 class="client-name">${item.name}</h3>
        </div>
      </div>
    </div>
  `;
  track.appendChild(slide);
});

const dots = document.querySelectorAll(".dots span");

/* ===== Atualização ===== */
function updateCarousel() {
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

/* ===== Setas (desktop) ===== */
prev.addEventListener("click", () => {
  index = (index - 1 + data.length) % data.length;
  updateCarousel();
});

next.addEventListener("click", () => {
  index = (index + 1) % data.length;
  updateCarousel();
});

/* ===== SWIPE MOBILE ===== */
let startX = 0;
let currentX = 0;
let isDragging = false;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isDragging = true;
  track.style.transition = "none";
});

track.addEventListener("touchmove", e => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  track.style.transform = `translateX(calc(-${index * 100}% + ${diff}px))`;
});

track.addEventListener("touchend", () => {
  isDragging = false;
  const diff = currentX - startX;

  if (diff < -50 && index < data.length - 1) {
    index++;
  } else if (diff > 50 && index > 0) {
    index--;
  }

  updateCarousel();
});

/* Inicial */
updateCarousel();
