import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const ENV_KEYS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

function readConfig() {
  const cfg = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const missing = ENV_KEYS.filter((k) => !String(import.meta.env[k] ?? "").trim());

  if (missing.length) {
    const hint = import.meta.env.PROD
      ? "Sur Vercel : Settings → Environment Variables : ajoutez toutes les variables VITE_FIREBASE_* pour Production (et Preview si besoin), puis redeployez."
      : "Copiez .env.example vers .env et renseignez la console Firebase.";
    const msg = `[Firebase] Variables manquantes : ${missing.join(", ")}. ${hint}`;
    if (import.meta.env.DEV) {
      console.warn(msg);
    } else {
      console.error(msg);
    }
  }

  return cfg;
}

function getFirebaseApp() {
  if (getApps().length) return getApp();

  const cfg = readConfig();
  const apiKey = String(cfg.apiKey ?? "").trim();
  if (!apiKey) {
    throw new Error(
      "Firebase : la clé API est vide. Ajoutez les variables VITE_FIREBASE_* dans Vercel (Environment Variables), puis redeployez le projet."
    );
  }

  return initializeApp(cfg);
}

export const app = getFirebaseApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
