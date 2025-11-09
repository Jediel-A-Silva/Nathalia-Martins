// =============================
// 🎬 CONTROLE DE VÍDEOS + CARROSSEL INFINITO REAL (SEM CLONES)
// =============================

const videoPrincipal = document.getElementById("videoPrincipal");
const source = videoPrincipal.querySelector("source");
const carrossel = document.querySelector(".carrossel-container");
const itens = Array.from(document.querySelectorAll(".carrossel-item"));

let index = 0;
let usuarioIniciou = false;

// -----------------------------
// 🔄 TROCAR VÍDEO PRINCIPAL
// -----------------------------
function trocarVideo(novoSrc, novoPoster) {
  try {
    source.src = novoSrc;
    videoPrincipal.poster = novoPoster;
    videoPrincipal.load();
    videoPrincipal.play();

    // Ajuste dinâmico de proporção
    videoPrincipal.addEventListener("loadedmetadata", () => {
      const ratio = videoPrincipal.videoWidth / videoPrincipal.videoHeight;
      const container = document.querySelector(".main-video");

      container.style.transition = "all 0.6s ease";
      videoPrincipal.style.transition = "all 0.6s ease";

      if (ratio < 1) {
        container.style.maxWidth = "600px";
        container.style.maxHeight = "90vh";
        container.style.aspectRatio = "9 / 16";
        videoPrincipal.style.objectFit = "contain";
      } else {
        container.style.maxWidth = "1100px";
        container.style.maxHeight = "75vh";
        container.style.aspectRatio = "16 / 9";
        videoPrincipal.style.objectFit = "cover";
      }

      container.style.margin = "0 auto";
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
    });

  } catch (error) {
    console.warn("⚠️ Erro ao trocar vídeo:", error);
  }
}

// -----------------------------
// ✨ Destacar item ativo
// -----------------------------
function destacarItemSelecionado() {
  itens.forEach((item, i) => {
    if (i === index) {
      item.style.border = "4px solid #b72f6b";
      item.style.transform = "scale(1.05)";
      item.style.boxShadow = "0 0 25px rgba(183,47,107,0.4)";
    } else {
      item.style.border = "none";
      item.style.transform = "scale(1)";
      item.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    }
  });
}

// -----------------------------
// 🎯 Centralizar item
// -----------------------------
function rolarParaItem(i, instantaneo = false) {
  const behavior = instantaneo ? "auto" : "smooth";
  carrossel.scrollTo({
    left: itens[i].offsetLeft - carrossel.offsetWidth / 2 + itens[i].offsetWidth / 2,
    behavior
  });
  destacarItemSelecionado();
}

// -----------------------------
// 🖱️ Clique em item troca vídeo
// -----------------------------
carrossel.addEventListener("click", e => {
  const item = e.target.closest(".carrossel-item");
  if (!item) return;
  index = itens.indexOf(item);
  destacarItemSelecionado();
  const video = item.querySelector("video");
  const src = video?.getAttribute("src");
  const poster = video?.getAttribute("poster");
  if (src) trocarVideo(src, poster);
});

// -----------------------------
// ⌨️ Setas do teclado (loop infinito real, sem clones)
// -----------------------------
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") {
    index++;
    if (index >= itens.length) {
      index = 0; // volta pro primeiro
      rolarParaItem(index, true);
    } else {
      rolarParaItem(index);
    }
  } else if (e.key === "ArrowLeft") {
    index--;
    if (index < 0) {
      index = itens.length - 1; // vai pro último
      rolarParaItem(index, true);
    } else {
      rolarParaItem(index);
    }
  }
});

// -----------------------------
// ⏯️ Inicialização
// -----------------------------
window.addEventListener("load", () => {
  document.querySelectorAll("video").forEach(v => v.pause());
  destacarItemSelecionado();
});
