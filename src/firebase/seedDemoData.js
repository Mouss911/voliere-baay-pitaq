import {
  doc,
  getDoc,
  writeBatch,
} from "firebase/firestore";

import { db } from "./config";
import {
  INITIAL_VOLIERE_CAGES,
  MOCK_COUPLES,
  MOCK_GENEALOGY,
  MOCK_PIGEONS,
  MOCK_REPRODUCTIONS,
  MOCK_SORTIES_CHEPTEL,
  MOCK_USER_SETTINGS,
} from "../data/mockData";

const META_PATH = "_meta";
const META_DOC = "app";

/** @param {string} userId */
export async function isUserSeeded(userId) {
  const ref = doc(db, "users", userId, META_PATH, META_DOC);
  const snap = await getDoc(ref);
  return snap.exists() && snap.data()?.seeded === true;
}

/**
 * Copie les jeux de données de démo (mock) dans Firestore pour ce compte.
 * @param {string} userId
 */
export async function seedDemoDataForUser(userId) {
  const batch = writeBatch(db);

  const metaRef = doc(db, "users", userId, META_PATH, META_DOC);
  batch.set(metaRef, { seeded: true, seededAt: new Date().toISOString() });

  for (const p of MOCK_PIGEONS) {
    const { id, ...data } = p;
    batch.set(doc(db, "users", userId, "pigeons", String(id)), data);
  }

  for (const c of MOCK_COUPLES) {
    const { id, ...data } = c;
    batch.set(doc(db, "users", userId, "couples", String(id)), data);
  }

  for (const r of MOCK_REPRODUCTIONS) {
    const { id, ...data } = r;
    batch.set(doc(db, "users", userId, "reproductions", String(id)), data);
  }

  for (const cage of INITIAL_VOLIERE_CAGES) {
    const { id, ...data } = cage;
    batch.set(doc(db, "users", userId, "cages", String(id)), data);
  }

  for (const s of MOCK_SORTIES_CHEPTEL) {
    const { id, ...data } = s;
    batch.set(doc(db, "users", userId, "sorties", String(id)), data);
  }

  for (const g of MOCK_GENEALOGY) {
    const docId = encodeGenealogyId(g.sujet);
    batch.set(doc(db, "users", userId, "genealogy", docId), g);
  }

  batch.set(doc(db, "users", userId, "settings", "profile"), {
    ...MOCK_USER_SETTINGS,
  });

  await batch.commit();
}

export function encodeGenealogyId(sujet) {
  return String(sujet).replace(/\//g, "_");
}

/**
 * Si le compte n’a pas encore été initialisé, enregistre les données de démo.
 * @param {string} userId
 */
export async function ensureUserSeeded(userId) {
  if (await isUserSeeded(userId)) return;
  await seedDemoDataForUser(userId);
}
