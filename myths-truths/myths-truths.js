// =============================
// 🎬 Controle de vídeos - Enfermeira Obstetra
// =============================

// Guardar o vídeo e capa principal
const videoPrincipal = document.getElementById("videoPrincipal");
const source = videoPrincipal.querySelector("source");

const videoPrincipalOriginal = {
  src: source.src,
  poster: videoPrincipal.poster
};

// Guardar vídeos assistidos
const videosAssistidos = new Set();

// Função para trocar o vídeo
function trocarVideo(novoSrc, novoPoster) {
  try {
    source.src = novoSrc;
    videoPrincipal.poster = novoPoster;
    videoPrincipal.load();
    videoPrincipal.play();

    // Marca o vídeo como assistido
    videosAssistidos.add(novoSrc);

  } catch (error) {
    console.warn("Vídeo não encontrado:", novoSrc);
    alert("⚠️ Não foi possível carregar o vídeo selecionado.");
  }
}

// Quando o vídeo terminar...
videoPrincipal.addEventListener("ended", () => {
  console.log("Vídeo terminou:", source.src);

  // Se todos os vídeos do carrossel já foram assistidos
  const totalVideos = document.querySelectorAll(".carrossel-item").length;

  if (videosAssistidos.size >= totalVideos) {
    // Volta para o principal
    voltarVideoPrincipal();
  }
});

// Função para voltar ao vídeo principal original
function voltarVideoPrincipal() {
  source.src = videoPrincipalOriginal.src;
  videoPrincipal.poster = videoPrincipalOriginal.poster;
  videoPrincipal.load();
  videoPrincipal.play();
  videosAssistidos.clear(); // reseta a contagem
  console.log("Retornou ao vídeo principal.");
}
// =============================