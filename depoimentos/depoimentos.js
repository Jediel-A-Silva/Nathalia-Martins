const urlPlanilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6tbMbvUrYWiRqLempQCTqqLnpO1z9MqavPBrVvhuupY2im9g_z49VmRZEEqbrfwQ0c1VMlee2u41A/pub?gid=1044557584&single=true&output=csv";
const urlWebApp = "https://script.google.com/macros/s/AKfycbwvbTxP4fQp9b5P0tWUoq9VSH99AIoI6dW-wHu0zj444pcVR5VyJ95EyJWBktXm5RELZw/exec";

// Carrega e exibe depoimentos
function carregarDepoimentos() {
  fetch(urlPlanilha)
    .then(res => res.text())
    .then(csv => {
      const linhas = csv.split("\n").slice(1);
      const container = document.getElementById("depoimentos-container");
      container.innerHTML = "";

      linhas.forEach(linha => {
        const [nome, depoimento] = linha.split(",");
        if (nome && depoimento) {
          const div = document.createElement("div");
          div.classList.add("depoimento-item");
          div.innerHTML = `
            <h3>${nome}</h3>
            <p>${depoimento}</p>
          `;
          container.appendChild(div);
        }
      });
    })
    .catch(err => console.error("Erro ao carregar depoimentos:", err));
}

document.addEventListener("DOMContentLoaded", carregarDepoimentos);

// Envio de novo depoimento
document.getElementById("form-depoimento").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (nome && mensagem) {
    fetch(urlWebApp, {
      method: "POST",
      body: JSON.stringify({ nome, depoimento: mensagem }),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(() => {
      alert("Depoimento enviado com sucesso! Aguarde aprovação.");
      document.getElementById("form-depoimento").reset();
      carregarDepoimentos(); // Atualiza a lista (opcional)
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao enviar. Tente novamente.");
    });
  }
});
