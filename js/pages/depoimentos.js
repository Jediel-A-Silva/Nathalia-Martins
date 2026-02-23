/* =====================================================
   IMPORTS FIREBASE
===================================================== */
import { db, storage } from "../firebase/firebase-config.js";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";


/* =====================================================
   FEEDBACKS FIXOS (ORIGINAIS)
===================================================== */
const feedbacksFixos = [
  {
    img: "/assets/img/depoimentos/thalitavieira.jpg",
    text: `Muito obrigada por tanto, Naty! Eu jamais vou esquecer o que vivemos e quão importante foi ter o seu apoio pra chegada do Murillo! 💚🦊`,
    name: "Thalita Vieira"
  },
  {
    img: "/assets/img/depoimentos/nathaliakouch.jpg",
    class: "foto-kouch",
    text: `Gatissima, vc faz um trabalho incrivel! E sempre que eu tive qq dúvida inclusive antes e depois do parto vc estava la esclarecendo e me acalmando com td paciencia e carinho. Muito loka quem diz que tu não é humana. Serei sempre grata a vc ❤️ De fato quem puder ir com equipe propria é o melhor dos mundos. Me senti acolhida. E msm que tenha ido pra cesárea, eu fui muito segura de que foi pq precisava msm, e vc quem me deu essa segurança.`,
    name: "Natalia Mitie Kouchi"
  },
  {
    img: "/assets/img/depoimentos/marcela.jpeg",
    text: `Queria te agradecer demais por todo suporte que me deu no meu TP Você é incrível e foi única comigo Sei que deve ouvir isso muitas vezes rsrs (merecido) porém vc é incrível e saiba do seu valor Se todos as enf fossem assim como vc estaríamos vivendo um mundo de partos melhor Você fez a diferença naquele dia pra mim Muito obrigada ❤️ Desejo muita luz em seu caminho e que todas grávidas possam ter o prazer de te conhecer 🫶 Grande abraço e bom domingo`,
    name: "Marcela"
  },
  {
    img: "/assets/img/depoimentos/carolrenan.png",
    text: `Naaaati, incrível ter você com a gente em dois momentos tão incríveis da nossa vida! A nossa família é muito sua fã! ❤️`,
    name: "Carol Matern e Renan"
  },
  {
    img: "/assets/img/depoimentos/brunarossetto.jpg",
    text: `Oiiii Nath! Tudo bem? Passando para te agradecer por tudo o que você fez por mim e pela minha família 🥹🫶 Que experiência indescritível e intensa! Você teve um papel importantíssimo no dia mais incrível da minha vida. Você é um ser iluminado, te agradeço pela força, pelo olhar de segurança, por tentar ao máximo com que eu conseguisse com segurança um parto normal 🫶 Por me chamar de deusa parideira, frase poderosa, igual a você! Obrigada obrigada obrigada! ❤️🫶🥹💪🏼`,
    name: "Bruna Rosetto"
  },
  {
    img: "/assets/img/depoimentos/danielle.jpeg",
    text: `De verdade, eu só consegui porque você me deu um apoio incrível, incontáveis vezes eu falo bem de você, da sua paciência, do seu carinho... A forma que me olhava, eu nunca vou me esquecer do seu rosto, do seu olhar... Fora que foi minha anja, pois percebeu que meu inchaço não estava normal🩷`,
    name: "Danielle Da Silva Santos"
  },
  {
    img: "/assets/img/depoimentos/leticia.jpg",
    text: `Eu já estava desconfortável com meu pré-natal, e encontrar vocês foi o nosso maior acerto. Você abraçou nossa gestação, nossa família. Senti sua admiração o tempo todo por mim. Você é competente, tem um olhar único e uma sensibilidade que me surpreendeu. Foi muito especial quando, mesmo sendo cristã, perguntou se eu queria cantiga ou fio do candomblé. Me senti respeitada, valorizada por ser quem eu sou, com a minha fé e a minha história. Estou encantada com a magia do dia 15/10. Obrigada, Nath! 🥹❤`,
    name: "Leticía Fialho"
  }
];


/* =====================================================
   VARIÁVEIS GLOBAIS
===================================================== */
let data = [];
let index = 0;


/* =====================================================
   ELEMENTOS DOM
===================================================== */
const imgEl = document.querySelector(".card-content img");
const textEl = document.querySelector(".text-area p");
const nameEl = document.querySelector(".client-name");
const dotsContainer = document.querySelector(".dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const card = document.querySelector(".card");
const btnEnviar = document.getElementById("btnEnviar");


/* =====================================================
   CRIAR DOTS
===================================================== */
function createDots() {
  dotsContainer.innerHTML = "";

  data.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      index = i;
      update();
    });
    dotsContainer.appendChild(dot);
  });
}


/* =====================================================
   UPDATE CARROSSEL
===================================================== */
function update() {
  if (!data.length || !data[index]) return;

  const item = data[index];

  imgEl.src = item.img;
  textEl.textContent = item.text;
  nameEl.textContent = item.name;

  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach(d => d.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}


/* =====================================================
   SETAS
===================================================== */
prevBtn.addEventListener("click", () => {
  index = (index - 1 + data.length) % data.length;
  update();
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % data.length;
  update();
});


/* =====================================================
   SWIPE MOBILE
===================================================== */
let startX = 0;
let currentX = 0;
let isDragging = false;

card.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

card.addEventListener("touchmove", e => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});

card.addEventListener("touchend", () => {
  isDragging = false;
  const diff = currentX - startX;

  if (diff < -40) index = (index + 1) % data.length;
  if (diff > 40) index = (index - 1 + data.length) % data.length;

  update();
});


/* =====================================================
   CARREGAR FIREBASE + JUNTAR COM FIXOS
===================================================== */
async function carregarFeedbacks() {
  const querySnapshot = await getDocs(collection(db, "feedbacks"));

  const feedbacksFirebase = [];

  querySnapshot.forEach((doc) => {
    const item = doc.data();

    if (item.foto && item.mensagem && item.nome) {
      feedbacksFirebase.push({
        img: item.foto,
        text: item.mensagem,
        name: item.nome
      });
    }
  });

  // Junta fixos + novos
  data = [...feedbacksFixos, ...feedbacksFirebase];

  index = 0;
  createDots();
  update();
}


/* =====================================================
   ENVIAR FEEDBACK + FOTO
===================================================== */
btnEnviar.addEventListener("click", async () => {
  const nome = document.querySelector("input[type='text']").value;
  const mensagem = document.querySelector("textarea").value;
  const nota = document.querySelector("select").value;
  const file = document.querySelector("input[type='file']").files[0];

  if (!nome || !mensagem || !file) {
    alert("Preencha todos os campos e envie uma foto.");
    return;
  }

  try {
    const storageRef = ref(storage, "feedbacks/" + Date.now() + "-" + file.name);
    await uploadBytes(storageRef, file);
    const fotoURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, "feedbacks"), {
      nome,
      mensagem,
      nota,
      foto: fotoURL,
      createdAt: serverTimestamp()
    });

    alert("Feedback enviado com sucesso!");

    carregarFeedbacks();

  } catch (error) {
    console.error("Erro ao enviar:", error);
  }
});


/* =====================================================
   INICIALIZAÇÃO
===================================================== */
carregarFeedbacks();