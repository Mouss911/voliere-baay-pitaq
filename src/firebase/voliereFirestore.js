import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./config";

/**
 * @typedef {Object} VoliereSnapshot
 * @property {Record<string, unknown>[]} pigeons
 * @property {Record<string, unknown>[]} couples
 * @property {Record<string, unknown>[]} reproductions
 * @property {Record<string, unknown>[]} cages
 * @property {Record<string, unknown>[]} sorties
 * @property {Record<string, unknown>[]} genealogy
 * @property {Record<string, unknown> | null} settings
 */

/** @template T @param {T[]} arr */
function sortByNumericId(arr) {
  return [...arr].sort((a, b) => {
    const na = Number(a.id);
    const nb = Number(b.id);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
  });
}

/**
 * Écoute toutes les collections volière d’un utilisateur.
 * @param {string} userId
 * @param {(data: VoliereSnapshot) => void} onUpdate
 * @returns {() => void}
 */
export function subscribeUserVoliere(userId, onUpdate) {
  /** @type {VoliereSnapshot} */
  const state = {
    pigeons: [],
    couples: [],
    reproductions: [],
    cages: [],
    sorties: [],
    genealogy: [],
    settings: null,
  };

  const notify = () =>
    onUpdate({
      pigeons: [...state.pigeons],
      couples: [...state.couples],
      reproductions: [...state.reproductions],
      cages: [...state.cages],
      sorties: [...state.sorties],
      genealogy: [...state.genealogy],
      settings: state.settings ? { ...state.settings } : null,
    });

  const unsubs = [
    onSnapshot(collection(db, "users", userId, "pigeons"), (snap) => {
      state.pigeons = sortByNumericId(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      notify();
    }),
    onSnapshot(collection(db, "users", userId, "couples"), (snap) => {
      state.couples = sortByNumericId(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      notify();
    }),
    onSnapshot(collection(db, "users", userId, "reproductions"), (snap) => {
      state.reproductions = sortByNumericId(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      notify();
    }),
    onSnapshot(collection(db, "users", userId, "cages"), (snap) => {
      state.cages = sortByNumericId(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      notify();
    }),
    onSnapshot(collection(db, "users", userId, "sorties"), (snap) => {
      state.sorties = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      notify();
    }),
    onSnapshot(collection(db, "users", userId, "genealogy"), (snap) => {
      state.genealogy = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      notify();
    }),
    onSnapshot(doc(db, "users", userId, "settings", "profile"), (snap) => {
      state.settings = snap.exists() ? snap.data() : null;
      notify();
    }),
  ];

  return () => {
    unsubs.forEach((u) => u());
  };
}

/** @param {string} userId @param {string} cageId @param {Record<string, unknown>} patch */
export async function updateCageDoc(userId, cageId, patch) {
  await updateDoc(doc(db, "users", userId, "cages", cageId), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

/** @param {string} userId @param {Record<string, unknown>} data */
export async function addPigeonDoc(userId, data) {
  const ref = await addDoc(collection(db, "users", userId, "pigeons"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** @param {string} userId @param {string} pigeonId @param {Record<string, unknown>} patch */
export async function updatePigeonDoc(userId, pigeonId, patch) {
  await updateDoc(doc(db, "users", userId, "pigeons", pigeonId), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

/** @param {string} userId @param {Record<string, unknown>} data */
export async function addCoupleDoc(userId, data) {
  const ref = await addDoc(collection(db, "users", userId, "couples"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** @param {string} userId @param {string} coupleId @param {Record<string, unknown>} patch */
export async function updateCoupleDoc(userId, coupleId, patch) {
  await updateDoc(doc(db, "users", userId, "couples", coupleId), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

/** @param {string} userId @param {Record<string, unknown>} data */
export async function addReproductionDoc(userId, data) {
  const ref = await addDoc(collection(db, "users", userId, "reproductions"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** @param {string} userId @param {Record<string, unknown>} data */
export async function addCageDoc(userId, data) {
  const ref = await addDoc(collection(db, "users", userId, "cages"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** @param {string} userId @param {Record<string, unknown>} patch */
export async function saveSettingsProfileDoc(userId, patch) {
  await setDoc(
    doc(db, "users", userId, "settings", "profile"),
    {
      ...patch,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
