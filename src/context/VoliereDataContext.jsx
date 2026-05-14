import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { occupationResume } from "../data/mockData";
import { ensureUserSeeded } from "../firebase/seedDemoData";
import {
  addCageDoc,
  addCoupleDoc,
  addPigeonDoc,
  addReproductionDoc,
  saveSettingsProfileDoc,
  subscribeUserVoliere,
  updateCageDoc,
  updateCoupleDoc,
  updatePigeonDoc,
} from "../firebase/voliereFirestore";

const VoliereDataContext = createContext(null);

function emptySnap() {
  return {
    pigeons: [],
    couples: [],
    reproductions: [],
    cages: [],
    sorties: [],
    genealogy: [],
    settings: null,
  };
}

/** @param {{ userId: string | null | undefined; children: import('react').ReactNode }} props */
export function VoliereDataProvider({ userId, children }) {
  const uid = userId ?? null;
  const [seeding, setSeeding] = useState(!!uid);
  const [hasSnapshot, setHasSnapshot] = useState(false);
  const [snap, setSnap] = useState(emptySnap);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    let cancelled = false;
    let unsub = () => {};

    /* eslint-disable react-hooks/set-state-in-effect -- réinitialisation avant async + onSnapshot */
    setError(null);
    setSeeding(true);
    setHasSnapshot(false);
    /* eslint-enable react-hooks/set-state-in-effect */

    (async () => {
      try {
        await ensureUserSeeded(uid);
        if (cancelled) return;
        setSeeding(false);
        unsub = subscribeUserVoliere(uid, (data) => {
          if (cancelled) return;
          setSnap(data);
          setHasSnapshot(true);
        });
      } catch (e) {
        if (cancelled) return;
        setSeeding(false);
        setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      cancelled = true;
      unsub();
    };
  }, [uid]);

  const cagesList = useMemo(
    () =>
      snap.cages.map((c) => ({
        id: String(c.id),
        numero: c.numero,
        nom: c.nom,
        superficieM2: c.superficieM2,
        typeOccupation: c.typeOccupation,
        occupation: occupationResume(c),
      })),
    [snap.cages]
  );

  const getPigeonById = useCallback(
    (id) => snap.pigeons.find((p) => String(p.id) === String(id)) ?? null,
    [snap.pigeons]
  );

  const getCoupleById = useCallback(
    (id) => snap.couples.find((c) => String(c.id) === String(id)) ?? null,
    [snap.couples]
  );

  const updateCage = useCallback(
    async (cageId, patch) => {
      if (!uid) return;
      await updateCageDoc(uid, String(cageId), patch);
    },
    [uid]
  );

  const addPigeon = useCallback(
    async (data) => {
      if (!uid) throw new Error("Non connecté");
      return addPigeonDoc(uid, data);
    },
    [uid]
  );

  const updatePigeon = useCallback(
    async (pigeonId, patch) => {
      if (!uid) throw new Error("Non connecté");
      await updatePigeonDoc(uid, String(pigeonId), patch);
    },
    [uid]
  );

  const addCouple = useCallback(
    async (data) => {
      if (!uid) throw new Error("Non connecté");
      return addCoupleDoc(uid, data);
    },
    [uid]
  );

  const updateCouple = useCallback(
    async (coupleId, patch) => {
      if (!uid) throw new Error("Non connecté");
      await updateCoupleDoc(uid, String(coupleId), patch);
    },
    [uid]
  );

  const addReproduction = useCallback(
    async (data) => {
      if (!uid) throw new Error("Non connecté");
      return addReproductionDoc(uid, data);
    },
    [uid]
  );

  const addCage = useCallback(
    async (data) => {
      if (!uid) throw new Error("Non connecté");
      return addCageDoc(uid, data);
    },
    [uid]
  );

  const saveSettings = useCallback(
    async (patch) => {
      if (!uid) throw new Error("Non connecté");
      await saveSettingsProfileDoc(uid, patch);
    },
    [uid]
  );

  const value = useMemo(
    () => ({
      uid,
      loading: Boolean(uid) && (seeding || !hasSnapshot),
      seeding,
      error,
      pigeons: uid ? snap.pigeons : [],
      couples: uid ? snap.couples : [],
      reproductions: uid ? snap.reproductions : [],
      cages: uid ? snap.cages : [],
      cagesList: uid ? cagesList : [],
      sorties: uid ? snap.sorties : [],
      genealogy: uid ? snap.genealogy : [],
      settings: uid ? snap.settings : null,
      getPigeonById,
      getCoupleById,
      updateCage,
      addPigeon,
      updatePigeon,
      addCouple,
      updateCouple,
      addReproduction,
      addCage,
      saveSettings,
    }),
    [
      uid,
      seeding,
      hasSnapshot,
      error,
      snap,
      cagesList,
      getPigeonById,
      getCoupleById,
      updateCage,
      addPigeon,
      updatePigeon,
      addCouple,
      updateCouple,
      addReproduction,
      addCage,
      saveSettings,
    ]
  );

  return (
    <VoliereDataContext.Provider value={value}>
      {children}
    </VoliereDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lié au provider
export function useVoliere() {
  const ctx = useContext(VoliereDataContext);
  if (!ctx) {
    throw new Error("useVoliere doit être utilisé dans un VoliereDataProvider");
  }
  return ctx;
}
