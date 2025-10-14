// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUju-1X0yjTZVT7uc5EIqST7yX_TxPCyM",
  authDomain: "kingbiliardifirebase.firebaseapp.com",
  databaseURL: "https://kingbiliardifirebase-default-rtdb.firebaseio.com/",
  projectId: "kingbiliardifirebase",
  storageBucket: "kingbiliardifirebase.appspot.com",
  messagingSenderId: "1234567890",
  appId: "kingbiliardifirebase"
};

// Inizializzazione Firebase
const app = initializeApp(firebaseConfig);

// Esporta il database
export const db = getDatabase(app);
