import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  INITIAL_VOLIERE_CAGES,
  MOCK_COUPLES,
  MOCK_PIGEONS,
  occupationCourt,
} from "../../data/mockData";

function cloneCages() {
  return INITIAL_VOLIERE_CAGES.map((c) => ({ ...c }));
}

function cellClasses(type) {
  if (type === "libre")
    return "border-emerald-700 bg-emerald-500 text-white shadow-inner";
  if (type === "pigeon_seul")
    return "border-red-900 bg-red-600 text-white shadow-inner";
  return "border-amber-800 bg-amber-500 text-white shadow-inner";
}

function titleCage(c) {
  if (c.typeOccupation === "libre") return `${c.numero} — cage libre`;
  if (c.typeOccupation === "pigeon_seul")
    return `${c.numero} — pigeon ${c.pigeonSoloBague}`;
  return `${c.numero} — ${c.coupleMale} & ${c.coupleFemelle}`;
}

export const VoliereView = () => {
  const [cages, setCages] = useState(cloneCages);
  const [selectedId, setSelectedId] = useState(null);

  const selected = useMemo(
    () => cages.find((x) => x.id === selectedId) ?? null,
    [cages, selectedId]
  );

  const pigeonsDisponiblesSolo = useMemo(
    () =>
      MOCK_PIGEONS.filter((p) =>
        ["Actif", "Jeune", "Repos"].includes(p.statut)
      ),
    []
  );

  const couplesDisponibles = useMemo(
    () => MOCK_COUPLES.filter((c) => c.statut !== "Dissous"),
    []
  );

  const liberer = useCallback(() => {
    if (!selectedId) return;
    setCages((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              typeOccupation: "libre",
              pigeonSoloBague: null,
              coupleMale: null,
              coupleFemelle: null,
              historiqueApercu: "Cage libérée (simulation locale).",
              reproductionApercu: "—",
            }
          : c
      )
    );
    setSelectedId(null);
  }, [selectedId]);

  const affecterPigeonSeul = useCallback(
    (bague) => {
      if (!selectedId) return;
      setCages((prev) =>
        prev.map((c) =>
          c.id === selectedId
            ? {
                ...c,
                typeOccupation: "pigeon_seul",
                pigeonSoloBague: bague,
                coupleMale: null,
                coupleFemelle: null,
                historiqueApercu: `Pigeon ${bague} affecté (démo, sans API).`,
              }
            : c
        )
      );
      setSelectedId(null);
    },
    [selectedId]
  );

  const affecterCouple = useCallback(
    (male, femelle) => {
      if (!selectedId) return;
      setCages((prev) =>
        prev.map((c) =>
          c.id === selectedId
            ? {
                ...c,
                typeOccupation: "couple",
                pigeonSoloBague: null,
                coupleMale: male,
                coupleFemelle: femelle,
                historiqueApercu: `Couple ${male} + ${femelle} placé (démo).`,
                reproductionApercu: "Nouvelle portée à planifier.",
              }
            : c
        )
      );
      setSelectedId(null);
    },
    [selectedId]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Visualisation virtuelle de la volière
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-gray-600">
            Grille type « places » (cahier DTS) :{" "}
            <strong className="text-emerald-700">vert</strong> = libre,{" "}
            <strong className="text-red-700">rouge</strong> = un pigeon seul
            (bague au survol),{" "}
            <strong className="text-amber-800">orange</strong> = couple (deux
            bagues). Cliquez sur une case pour affecter ou consulter / libérer
            — mise à jour <strong>sans rechargement</strong> de la page (état
            React local).
          </p>
        </div>
        <Link
          to="/cages"
          className="shrink-0 text-sm font-medium text-green-600 hover:text-green-700"
        >
          Liste des cages →
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-xs text-gray-700 shadow-sm">
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-7 rounded border border-emerald-800 bg-emerald-500" />
          Libre
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-7 rounded border border-red-900 bg-red-600" />
          1 pigeon
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-7 rounded border border-amber-800 bg-amber-500" />
          Couple
        </span>
      </div>

      <section className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm sm:p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Volière principale — 20 cages
        </h2>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:gap-3">
          {cages.map((c) => (
            <button
              key={c.id}
              type="button"
              title={titleCage(c)}
              onClick={() => setSelectedId(c.id)}
              className={`flex min-h-[4.5rem] flex-col items-center justify-center rounded-lg border-2 p-2 text-center text-xs font-medium transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:min-h-[5.25rem] sm:text-sm ${cellClasses(c.typeOccupation)}`}
            >
              <span className="opacity-90">{c.numero}</span>
              <span className="mt-1 line-clamp-2 text-[10px] font-normal leading-tight opacity-95 sm:text-xs">
                {occupationCourt(c)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {selected ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-4 sm:items-center"
          role="presentation"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cage-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="cage-dialog-title"
              className="text-lg font-semibold text-gray-900"
            >
              {selected.numero} — {selected.nom}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Superficie indicative : {selected.superficieM2} m²
            </p>

            {selected.typeOccupation === "libre" ? (
              <div className="mt-6 space-y-5">
                <p className="text-sm text-gray-700">
                  Cage libre : affectez un pigeon seul ou un couple (données
                  locales, démo).
                </p>
                <AssignPigeonForm
                  key={selected.id}
                  pigeons={pigeonsDisponiblesSolo}
                  onPick={(bague) => affecterPigeonSeul(bague)}
                />
                <AssignCoupleForm
                  key={selected.id}
                  couples={couplesDisponibles}
                  onPick={(m, f) => affecterCouple(m, f)}
                />
              </div>
            ) : (
              <div className="mt-6 space-y-4 text-sm text-gray-800">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="font-medium text-gray-900">Contenu</p>
                  {selected.typeOccupation === "pigeon_seul" ? (
                    <p className="mt-2">
                      Pigeon seul :{" "}
                      <strong>{selected.pigeonSoloBague}</strong>
                    </p>
                  ) : (
                    <p className="mt-2">
                      Couple :{" "}
                      <strong>
                        {selected.coupleMale} + {selected.coupleFemelle}
                      </strong>
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Historique / suivi (aperçu)
                  </p>
                  <p className="mt-1">{selected.historiqueApercu}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Reproduction
                  </p>
                  <p className="mt-1">{selected.reproductionApercu}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Historique médical (exemple)
                  </p>
                  <p className="mt-1 text-gray-600">
                    Vaccin paramyxo : à jour (fictif). Dernière visite véto :
                    12/03/2025.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={liberer}
                  className="w-full rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-800 hover:bg-red-100"
                >
                  Libérer la cage
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

function AssignPigeonForm({ pigeons, onPick }) {
  const [bague, setBague] = useState(() => pigeons[0]?.bague ?? "");

  if (!pigeons.length) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        Aucun pigeon disponible dans la liste fictive.
      </p>
    );
  }

  return (
    <form
      className="rounded-lg border border-gray-200 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (bague) onPick(bague);
      }}
    >
      <p className="text-sm font-medium text-gray-900">Affecter un pigeon seul</p>
      <select
        value={bague}
        onChange={(e) => setBague(e.target.value)}
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      >
        {pigeons.map((p) => (
          <option key={p.id} value={p.bague}>
            {p.bague} ({p.sexe}) — {p.statut}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="mt-3 w-full rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        Placer ce pigeon
      </button>
    </form>
  );
}

function AssignCoupleForm({ couples, onPick }) {
  const [cid, setCid] = useState(() => couples[0]?.id ?? "");

  if (!couples.length) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        Aucun couple actif fictif à placer.
      </p>
    );
  }

  const c = couples.find((x) => x.id === cid) ?? couples[0];

  return (
    <form
      className="rounded-lg border border-gray-200 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (c) onPick(c.maleBague, c.femelleBague);
      }}
    >
      <p className="text-sm font-medium text-gray-900">Affecter un couple</p>
      <select
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      >
        {couples.map((x) => (
          <option key={x.id} value={x.id}>
            {x.nom} — {x.maleBague} + {x.femelleBague}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="mt-3 w-full rounded-lg bg-amber-600 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        Placer ce couple
      </button>
    </form>
  );
}
