// ----------------------------
// depoimentos-firebase.js
// ----------------------------

// ---------- CONFIGURE AQUI ----------
// Cole seu firebaseConfig (o objeto que o Firebase forneceu) abaixo:
const firebaseConfig = {
  apiKey: "AIzaSyBwlcVCWXAINq8gGuPfFz02BqGCy8Sjwt0",
  authDomain: "depoimentos-nathy.firebaseapp.com",
  projectId: "depoimentos-nathy",
  storageBucket: "depoimentos-nathy.firebasestorage.app",
  messagingSenderId: "840247558600",
  appId: "1:840247558600:web:180dce25766ae1ddabc0fd",
  measurementId: "G-WSTF662ZRX"
};

// ------------------------------------

// Inicializa Firebase (compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referência à coleção
const depoimentosCol = db.collection('Depoimentos');

// Elementos DOM
const slidesContainer = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const openBtn = document.getElementById("open-feedback");
const modal = document.getElementById("feedback-modal");
const closeBtn = document.getElementById("close-feedback");
const cancelBtn = document.getElementById("cancel-feedback");
const form = document.getElementById("feedback-form");
const statusTxt = document.getElementById("form-status");

let currentIndex = 0;
let autoSlide;
let direction = 1; // 1 = pra frente, -1 = pra trás

// ---------- Helpers do carrossel ----------

// Recalcula e mostra slide
function showSlide(index) {
  const slide = slidesContainer.querySelector(".slide");
  if (!slide) return;
  const slideWidth = slide.offsetWidth; // inclui padding
  const slides = slidesContainer.querySelectorAll(".slide");
  const maxIndex = slides.length - 1;
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;
  currentIndex = index;
  const offset = index * slideWidth;
  slidesContainer.style.transform = `translateX(-${offset}px)`;
}

// Próximo automático (ping-pong)
function autoNext() {
  const slides = slidesContainer.querySelectorAll(".slide");
  const lastIndex = slides.length - 1;
  currentIndex += direction;
  if (currentIndex >= lastIndex) {
    direction = -1;
  } else if (currentIndex <= 0) {
    direction = 1;
  }
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

function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(autoNext, 7000);
}
function stopAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
}

// Atualiza o carrossel quando mudam os slides (chame depois de adicionar/remover)
function ensureCurrentIndexValid() {
  const slides = slidesContainer.querySelectorAll(".slide");
  if (currentIndex > slides.length - 1) currentIndex = slides.length - 1;
  if (currentIndex < 0) currentIndex = 0;
  showSlide(currentIndex);
}

// ---------- Funções para criar slides a partir de dados ----------

function createSlideFromData(docData, docId) {
  // Cria a estrutura de slide igual ao seu HTML (ajuste se quiser)
  const slide = document.createElement("div");
  slide.className = "slide dynamic";
  // guardamos o id do documento
  slide.dataset.id = docId;

  const card = document.createElement("div");
  card.className = "card";

  const content = document.createElement("div");
  content.className = "card-content";

  // Imagem padrão (coloque uma imagem default em /img/default.jpg se quiser)
  const img = document.createElement("img");
  img.src = docData.photoUrl || "img/default-user.png";
  img.alt = docData.name || "Paciente";
  img.style.width = "220px";
  img.style.height = "230px";
  img.style.borderRadius = "6%";

  const textArea = document.createElement("div");
  textArea.className = "text-area";

  const p = document.createElement("p");
  p.textContent = docData.message || "";

  const stars = document.createElement("div");
  stars.className = "stars";
  const rating = parseInt(docData.rating || 5, 10);
  stars.textContent = "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);

  const h3 = document.createElement("h3");
  h3.className = "client-name";
  h3.textContent = `— ${docData.name || "Anônimo"}`;

  textArea.appendChild(p);
  textArea.appendChild(stars);
  textArea.appendChild(h3);

  content.appendChild(img);
  content.appendChild(textArea);
  card.appendChild(content);
  slide.appendChild(card);

  return slide;
}

function appendOrUpdateSlide(doc) {
  const docId = doc.id;
  const data = doc.data();
  // se já existe slide com esse id, atualiza; senão, adiciona
  const existing = slidesContainer.querySelector(`.slide.dynamic[data-id="${docId}"]`);
  if (existing) {
    const newSlide = createSlideFromData(data, docId);
    slidesContainer.replaceChild(newSlide, existing);
  } else {
    const newSlide = createSlideFromData(data, docId);
    slidesContainer.appendChild(newSlide);
  }
  ensureCurrentIndexValid();
}

// Remove slides dinâmicos (se precisar reconstruir)
function removeAllDynamicSlides() {
  const dyn = slidesContainer.querySelectorAll(".slide.dynamic");
  dyn.forEach(n => n.remove());
}

// ---------- Firestore: escuta em tempo real e atualiza o carrossel ----------

function startRealtimeListener() {
  // Ordena por createdAt (se não houver createdAt, aparece no final)
  depoimentosCol.orderBy('createdAt', 'asc').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added" || change.type === "modified") {
        appendOrUpdateSlide(change.doc);
      } else if (change.type === "removed") {
        // remove slide correspondente
        const removedId = change.doc.id;
        const node = slidesContainer.querySelector(`.slide.dynamic[data-id="${removedId}"]`);
        if (node) node.remove();
      }
    });
    // garante que o index atual ainda exista
    ensureCurrentIndexValid();
  }, (err) => {
    console.error("Erro ao ler depoimentos:", err);
  });
}

// ---------- Form handling (abrir modal / enviar) ----------

openBtn.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  statusTxt.textContent = "";
  form.reset();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusTxt.textContent = "Enviando...";
  const name = document.getElementById("nomeInput").value.trim();
  const message = document.getElementById("mensagemInput").value.trim();
  const rating = document.getElementById("ratingInput").value;

  if (!name || !message) {
    statusTxt.textContent = "Preencha nome e depoimento.";
    return;
  }

  try {
    await depoimentosCol.add({
      name,
      message,
      rating: parseInt(rating, 10),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    statusTxt.textContent = "Enviado! Obrigado.";
    form.reset();
    setTimeout(() => {
      closeModal();
    }, 900);
  } catch (err) {
    console.error(err);
    statusTxt.textContent = "Erro ao enviar. Tente novamente.";
  }
});

// Fechar modal ao clicar fora do conteúdo
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// fechar modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

// ---------- Integração com botões do carrossel e auto-play ----------

// usa os botões que você já tem
nextBtn.addEventListener("click", () => {
  nextSlide();
  startAutoSlide();
});
prevBtn.addEventListener("click", () => {
  prevSlide();
  startAutoSlide();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
    startAutoSlide();
  } else if (event.key === "ArrowLeft") {
    prevSlide();
    startAutoSlide();
  }
});

// Inicialização: mostra slide e começa o listener do Firestore
window.addEventListener("load", () => {
  // garante que slider mostre a posição inicial
  showSlide(0);
  startAutoSlide();
  // Inicia o listener em tempo real
  startRealtimeListener();
});