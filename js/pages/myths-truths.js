// =============================
// 🎬 CONTROLE DE VÍDEOS + CARROSSEL
// =============================

document.addEventListener("DOMContentLoaded", () => {

  const videoPrincipal = document.getElementById("videoPrincipal");
  const sourcePrincipal = videoPrincipal.querySelector("source");
  const carrossel = document.querySelector(".carrossel-container");
  const itens = Array.from(document.querySelectorAll(".carrossel-item"));

  let index = 0;

  // -----------------------------
  // 🔄 TROCAR VÍDEO PRINCIPAL
  // -----------------------------
  function trocarVideo(novoSrc, novoPoster) {
    try {
      sourcePrincipal.src = novoSrc;
      videoPrincipal.poster = novoPoster || "";
      videoPrincipal.load();
      videoPrincipal.play().catch(() => {});

      videoPrincipal.addEventListener("loadedmetadata", () => {
        ajustarProporcao();
      }, { once: true });

    } catch (error) {
      console.warn("⚠️ Erro ao trocar vídeo:", error);
    }
  }

  // -----------------------------
  // 📐 Ajustar proporção dinamicamente
  // -----------------------------
  function ajustarProporcao() {
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
  }

  // -----------------------------
  // ✨ Destacar item ativo
  // -----------------------------
  function destacarItemSelecionado() {
    itens.forEach((item, i) => {
      item.style.border = i === index ? "4px solid #b72f6b" : "none";
      item.style.transform = i === index ? "scale(1.05)" : "scale(1)";
      item.style.boxShadow = i === index
        ? "0 0 25px rgba(183,47,107,0.4)"
        : "0 8px 25px rgba(0,0,0,0.15)";
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
  // 🖱️ Clique no carrossel
  // -----------------------------
  carrossel.addEventListener("click", e => {
    const item = e.target.closest(".carrossel-item");
    if (!item) return;

    index = itens.indexOf(item);
    destacarItemSelecionado();

    const video = item.querySelector("video");
    const src = video?.querySelector("source")?.getAttribute("src");
    const poster = video?.getAttribute("poster");

    if (src) trocarVideo(src, poster);
  });

  // -----------------------------
  // ⌨️ Teclado (loop infinito real)
  // -----------------------------
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
      index = (index + 1) % itens.length;
      rolarParaItem(index, index === 0);
    }

    if (e.key === "ArrowLeft") {
      index = (index - 1 + itens.length) % itens.length;
      rolarParaItem(index, index === itens.length - 1);
    }
  });

  // -----------------------------
  // 🚀 Inicialização
  // -----------------------------
  window.addEventListener("load", () => {
    document.querySelectorAll(".carrossel-item video").forEach(v => v.pause());
    destacarItemSelecionado();
    ajustarProporcao();
  });

});