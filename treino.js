// Remove toggle manual, agora o menu aparece com hover

// Fecha o menu ao clicar em um link
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const links = menu.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
    });
  });
});

function toggleChat() {
  const chat = document.getElementById("iaChat");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}
