// Seleciona modal e frame
const modal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const closeBtn = document.querySelector(".close");

// Botão principal de play
const heroPlayBtn = document.querySelector(".play-btn");
heroPlayBtn.addEventListener("click", () => {
  const videoURL = heroPlayBtn.getAttribute("data-video");
  openVideo(videoURL);
});

// Clique nos cards do carrossel
document.querySelectorAll(".carrossel-item").forEach(item => {
  item.addEventListener("click", () => {
    const videoURL = item.getAttribute("data-video");
    openVideo(videoURL);
  });
});

// Função para abrir vídeo no modal
function openVideo(url) {
  modal.style.display = "flex";
  videoFrame.src = url + "?autoplay=1";
}

// Fechar modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  videoFrame.src = "";
});

// Fechar clicando fora
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    videoFrame.src = "";
  }
});
