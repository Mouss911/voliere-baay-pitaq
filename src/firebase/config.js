import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const required = [
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
  const missing = required.filter((k) => !import.meta.env[k]);
  if (import.meta.env.DEV && missing.length) {
    console.warn(
      `[Firebase] Variables manquantes : ${missing.join(
        ", "
      )}. Copiez .env.example vers .env et renseignez la console Firebase.`
    );
  }
  return cfg;
}

function getFirebaseApp() {
  if (getApps().length) return getApp();
  return initializeApp(readConfig());
}

export const app = getFirebaseApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
