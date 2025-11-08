// =============================
// 🎬 Controle de vídeos + Carrossel com início por clique
// =============================

// -----------------------------
// 🎥 Controle do vídeo principal
// -----------------------------
const videoPrincipal = document.getElementById("videoPrincipal");
const source = videoPrincipal.querySelector("source");

const videoPrincipalOriginal = {
  src: source.src,
  poster: videoPrincipal.poster
};

const videosAssistidos = new Set();
let usuarioIniciou = false; // controla se o usuário clicou para iniciar

function trocarVideo(novoSrc, novoPoster) {
  try {
    source.src = novoSrc;
    videoPrincipal.poster = novoPoster;
    videoPrincipal.load();
    videoPrincipal.play();
    videosAssistidos.add(novoSrc);
  } catch (error) {
    console.warn("Vídeo não encontrado:", novoSrc);
    alert("⚠️ Não foi possível carregar o vídeo selecionado.");
  }
}

// -----------------------------
// 🌀 Carrossel infinito + arraste
// -----------------------------
const carrossel = document.querySelector(".carrossel-container");
let itens = Array.from(document.querySelectorAll(".carrossel-item"));
let index = 0;

// Duplicar se houver poucos itens
if (itens.length < 6) {
  const clones = itens.map(item => item.cloneNode(true));
  clones.forEach(clone => carrossel.appendChild(clone));
  itens = Array.from(document.querySelectorAll(".carrossel-item"));
}

function mostrarProximo() {
  index = (index + 1) % itens.length;
  rolarParaItem(index);
}

function rolarParaItem(i) {
  carrossel.scrollTo({
    left: itens[i].offsetLeft,
    behavior: "smooth"
  });
  trocarVideoDoItem(itens[i]);
}

// -----------------------------
// 🎬 Clique nos cards troca o vídeo principal
// -----------------------------
function trocarVideoDoItem(item) {
  const video = item.querySelector("video");
  const src = video ? video.getAttribute("src") : null;
  const poster = item.dataset.poster || video?.getAttribute("poster");
  if (src) trocarVideo(src, poster);
}

// -----------------------------
// ▶️ Início com clique do usuário
// -----------------------------
window.addEventListener("click", () => {
  if (!usuarioIniciou) {
    usuarioIniciou = true;
    videoPrincipal.play();
  }
});

// -----------------------------
// ⏭️ Quando o vídeo termina, vai pro próximo automaticamente
// -----------------------------
videoPrincipal.addEventListener("ended", () => {
  mostrarProximo();
});

// -----------------------------
// 🚫 Nenhum vídeo inicia até o clique
// -----------------------------
window.addEventListener("load", () => {
  document.querySelectorAll("video").forEach(v => v.pause());
});

// =============================
// ✅ Fim do arquivo (início com clique e troca automática)
// =============================
