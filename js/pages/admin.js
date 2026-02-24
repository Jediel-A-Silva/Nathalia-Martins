const ITEMS_PER_PAGE = 5;

import { db, auth } from "../firebase/firebase-config.js";
import { collection, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// DOM
const loginContainer = document.getElementById('loginContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackCount = document.getElementById('feedbackCount');
const btnLogin = document.getElementById('btnLogin');
const searchInput = document.getElementById('searchInput');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

const ALLOWED_UID = ["RFfoJS6VgCQXFqJFgR5Z41qlW432"];

let allFeedbacks = [];
let filteredFeedbacks = [];
let currentPage = 1;

// Login Google
btnLogin.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if(!ALLOWED_UID.includes(user.uid)) {
      alert("Acesso negado!");
      await signOut(auth);
      return;
    }

    mostrarDashboard();

  } catch(err) {
    console.error(err);
    alert("Erro ao logar com Google: " + err.message);
  }
});

// Mantém logado
onAuthStateChanged(auth, user => {
  if(user && ALLOWED_UID.includes(user.uid)) {
    mostrarDashboard();
  }
});

async function mostrarDashboard() {
  loginContainer.style.display = "none";
  dashboardContainer.style.display = "flex";
  await carregarFeedbacks();
}

// Carregar feedbacks
async function carregarFeedbacks() {
  feedbackContainer.innerHTML = `<div class="loading">Carregando feedbacks...</div>`;
  try {
    const snapshot = await getDocs(collection(db, "feedbacks"));
    allFeedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    filteredFeedbacks = [...allFeedbacks];
    currentPage = 1;
    atualizarDashboard();
  } catch(err) {
    feedbackContainer.innerHTML = `<div class="loading">Erro ao carregar feedbacks.</div>`;
    console.error(err);
  }
}

// Atualiza dashboard
function atualizarDashboard() {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = filteredFeedbacks.slice(start, end);

  feedbackContainer.innerHTML = "";
  feedbackCount.textContent = `Total de feedbacks: ${filteredFeedbacks.length}`;

  if(filteredFeedbacks.length === 0) {
    feedbackContainer.innerHTML = `<div class="loading">Nenhum feedback encontrado.</div>`;
    return;
  }

  pageItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'feedback-card';
    card.innerHTML = `
      <div class="feedback-top">
        <img src="${item.foto || 'https://via.placeholder.com/50'}" alt="Foto">
        <h3>${item.nome || 'Anônimo'}</h3>
      </div>
      <div class="feedback-msg">${item.mensagem || ''}</div>
      <button class="delete-btn">❌ Excluir</button>
    `;
    card.querySelector(".delete-btn").onclick = async () => {
      if(confirm(`Deseja realmente excluir o feedback de "${item.nome}"?`)) {
        await deleteDoc(doc(db, "feedbacks", item.id));
        allFeedbacks = allFeedbacks.filter(f => f.id !== item.id);
        filtrarFeedbacks(searchInput.value);
      }
    };
    feedbackContainer.appendChild(card);
  });

  atualizarBotoesPaginacao();
}

// Pesquisa
searchInput.addEventListener('input', e => {
  filtrarFeedbacks(e.target.value);
});

function filtrarFeedbacks(texto) {
  const termo = texto.toLowerCase();
  filteredFeedbacks = allFeedbacks.filter(f => (f.nome || '').toLowerCase().includes(termo));
  currentPage = 1;
  atualizarDashboard();
}

// Paginação
prevPageBtn.addEventListener('click', () => {
  if(currentPage > 1) {
    currentPage--;
    atualizarDashboard();
  }
});
nextPageBtn.addEventListener('click', () => {
  const maxPage = Math.ceil(filteredFeedbacks.length / ITEMS_PER_PAGE);
  if(currentPage < maxPage) {
    currentPage++;
    atualizarDashboard();
  }
});

function atualizarBotoesPaginacao() {
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === Math.ceil(filteredFeedbacks.length / ITEMS_PER_PAGE);
}