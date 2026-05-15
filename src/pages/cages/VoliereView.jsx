import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Modal } from "../../components/ui";
import { useVoliere } from "../../context/VoliereDataContext";
import { occupationCourt } from "../../data/mockData";

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
  const { cages, pigeons, couples, updateCage } = useVoliere();
  const [selectedId, setSelectedId] = useState(null);

  const selected = useMemo(
    () => cages.find((x) => String(x.id) === String(selectedId)) ?? null,
    [cages, selectedId]
  );

  const pigeonsDisponiblesSolo = useMemo(
    () =>
      pigeons.filter((p) => ["Actif", "Jeune", "Repos"].includes(p.statut)),
    [pigeons]
  );

  const couplesDisponibles = useMemo(
    () => couples.filter((c) => c.statut !== "Dissous"),
    [couples]
  );

  const liberer = useCallback(async () => {
    if (!selectedId) return;
    await updateCage(selectedId, {
      typeOccupation: "libre",
      pigeonSoloBague: null,
      coupleMale: null,
      coupleFemelle: null,
      historiqueApercu: "Cage libérée.",
      reproductionApercu: "—",
    });
    setSelectedId(null);
  }, [selectedId, updateCage]);

  const affecterPigeonSeul = useCallback(
    async (bague) => {
      if (!selectedId) return;
      await updateCage(selectedId, {
        typeOccupation: "pigeon_seul",
        pigeonSoloBague: bague,
        coupleMale: null,
        coupleFemelle: null,
        historiqueApercu: `Pigeon ${bague} affecté.`,
      });
      setSelectedId(null);
    },
    [selectedId, updateCage]
  );

  const affecterCouple = useCallback(
    async (male, femelle) => {
      if (!selectedId) return;
      await updateCage(selectedId, {
        typeOccupation: "couple",
        pigeonSoloBague: null,
        coupleMale: male,
        coupleFemelle: femelle,
        historiqueApercu: `Couple ${male} + ${femelle} placé.`,
        reproductionApercu: "Nouvelle portée à planifier.",
      });
      setSelectedId(null);
    },
    [selectedId, updateCage]
  );

  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Visualisation virtuelle de la volière
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-gray-600">
            Grille type « places » :{" "}
            <strong className="text-emerald-700">vert</strong> = libre,{" "}
            <strong className="text-red-700">rouge</strong> = un pigeon seul,{" "}
            <strong className="text-amber-800">orange</strong> = couple. Les
            changements sont persistés dans Firestore.
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
          Volière — {cages.length} cages
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

      <Modal
        open={Boolean(selected)}
        onClose={closeModal}
        title={selected ? `${selected.numero} — ${selected.nom}` : ""}
        description={
          selected ? `Superficie indicative : ${selected.superficieM2} m²` : undefined
        }
        footer={
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={closeModal}
          >
            Fermer
          </Button>
        }
      >
        {selected && selected.typeOccupation === "libre" ? (
          <div className="space-y-5">
            <p className="text-sm text-gray-700">
              Cage libre : affectez un pigeon seul ou un couple.
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
        ) : null}
        {selected && selected.typeOccupation !== "libre" ? (
          <div className="space-y-4 text-sm text-gray-800">
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
            <Button
              type="button"
              variant="danger"
              className="w-full"
              onClick={() => liberer()}
            >
              Libérer la cage
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

function AssignPigeonForm({ pigeons, onPick }) {
  const [bague, setBague] = useState(() => pigeons[0]?.bague ?? "");

  if (!pigeons.length) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        Aucun pigeon disponible pour placement seul.
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
      <Button type="submit" variant="primary" className="mt-3 w-full">
        Placer ce pigeon
      </Button>
    </form>
  );
}

function AssignCoupleForm({ couples, onPick }) {
  const [cid, setCid] = useState(() => couples[0]?.id ?? "");

  if (!couples.length) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        Aucun couple actif à placer.
      </p>
    );
  }

  const c = couples.find((x) => String(x.id) === String(cid)) ?? couples[0];

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
      <Button type="submit" variant="amber" className="mt-3 w-full">
        Placer ce couple
      </Button>
    </form>
  );
}
