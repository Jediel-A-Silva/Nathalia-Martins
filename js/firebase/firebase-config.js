// firebase-config.js

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { getStorage } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configuração
const firebaseConfig = {
  apiKey: "AIzaSyC0vYC_Uf4R9mvRzsAIcs9eBkfHk8ZwB-A",
  authDomain: "nathalia-martins.firebaseapp.com",
  projectId: "nathalia-martins",
  storageBucket: "nathalia-martins.firebasestorage.app",
  messagingSenderId: "201610785130",
  appId: "1:201610785130:web:154a69a6df7df7e0937513",
  measurementId: "G-8WPY055JX4"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // <-- adicionado

// Exporta tudo
export { db, storage, auth };