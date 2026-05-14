/** Données fictives — alignées sur le cahier DTS « gestion volière » (à remplacer par l’API). */

/** @typedef {'libre' | 'pigeon_seul' | 'couple'} TypeOccupationCage */

function createVolierCages20() {
  /** @type {Array<{ id: string; numero: string; nom: string; superficieM2: number; typeOccupation: TypeOccupationCage; pigeonSoloBague: string | null; coupleMale: string | null; coupleFemelle: string | null; historiqueApercu: string; reproductionApercu: string }>} */
  const cages = [];
  for (let i = 1; i <= 20; i++) {
    const n = String(i).padStart(2, "0");
    cages.push({
      id: String(i),
      numero: `Cage${n}`,
      nom: `Compartiment ${n}`,
      superficieM2: Number((1.0 + (i % 4) * 0.25).toFixed(2)),
      typeOccupation: "libre",
      pigeonSoloBague: null,
      coupleMale: null,
      coupleFemelle: null,
      historiqueApercu: "Aucun événement récent (démo).",
      reproductionApercu: "—",
    });
  }
  // Exemples document : Cage02 seul (quarantaine), Cage03 couple C001…
  cages[1].typeOccupation = "pigeon_seul";
  cages[1].pigeonSoloBague = "SN-2024-031";
  cages[1].historiqueApercu = "Quarantaine depuis le 02/04/2025.";

  cages[2].typeOccupation = "couple";
  cages[2].coupleMale = "SN-2024-014";
  cages[2].coupleFemelle = "SN-2023-088";
  cages[2].historiqueApercu = "Couple formé le 01/05/2024.";
  cages[2].reproductionApercu = "Portée 2025-1 : 2 œufs en couvaison.";

  cages[4].typeOccupation = "couple";
  cages[4].coupleMale = "SN-2021-055";
  cages[4].coupleFemelle = "SN-2022-201";
  cages[4].historiqueApercu = "Repos hors nid.";
  cages[4].reproductionApercu = "Dernière portée : 1 jeune sevré.";

  return cages;
}

export const INITIAL_VOLIERE_CAGES = createVolierCages20();

export function occupationResume(c) {
  if (c.typeOccupation === "libre") return "Libre";
  if (c.typeOccupation === "pigeon_seul") return c.pigeonSoloBague ?? "—";
  if (c.typeOccupation === "couple")
    return `${c.coupleMale ?? "?"} + ${c.coupleFemelle ?? "?"}`;
  return "—";
}

export function occupationCourt(c) {
  if (c.typeOccupation === "libre") return "Libre";
  if (c.typeOccupation === "pigeon_seul") return c.pigeonSoloBague ?? "";
  return "Couple";
}

/** Liste admin cages (même jeu que la visualisation). */
export const MOCK_CAGES = INITIAL_VOLIERE_CAGES.map((c) => ({
  id: c.id,
  numero: c.numero,
  nom: c.nom,
  superficieM2: c.superficieM2,
  typeOccupation: c.typeOccupation,
  occupation: occupationResume(c),
}));

export const MOCK_PIGEONS = [
  {
    id: "1",
    bague: "SN-2024-014",
    sexe: "M",
    couleur: "Gris barré",
    naissance: "2024-03-12",
    statut: "Actif",
    lignee: "Janssen",
    notes: "Excellent orientation.",
  },
  {
    id: "2",
    bague: "SN-2023-088",
    sexe: "F",
    couleur: "Bleu",
    naissance: "2023-05-20",
    statut: "Actif",
    lignee: "Bricoux",
    notes: "Mère prolifique.",
  },
  {
    id: "3",
    bague: "SN-2022-201",
    sexe: "F",
    couleur: "Gris clair",
    naissance: "2022-07-01",
    statut: "Actif",
    lignee: "Vandenabeele",
    notes: "",
  },
  {
    id: "4",
    bague: "SN-2021-055",
    sexe: "M",
    couleur: "Rouge",
    naissance: "2021-04-18",
    statut: "Actif",
    lignee: "Herbots",
    notes: "Bon reproducteur.",
  },
  {
    id: "5",
    bague: "SN-2024-031",
    sexe: "M",
    couleur: "Noir",
    naissance: "2024-06-02",
    statut: "Jeune",
    lignee: "Mixte",
    notes: "En volière d’élevage.",
  },
  {
    id: "6",
    bague: "SN-2020-400",
    sexe: "M",
    couleur: "Gris",
    naissance: "2020-02-14",
    statut: "Vendu",
    lignee: "Boulant",
    notes: "Sorti du cheptel — historique conservé.",
  },
  {
    id: "7",
    bague: "SN-2019-111",
    sexe: "F",
    couleur: "Bleu barré",
    naissance: "2019-04-20",
    statut: "Mort",
    lignee: "Local",
    notes: "Décès déclaré en salle.",
  },
];

export const MOCK_COUPLES = [
  {
    id: "1",
    nom: "Paire nord",
    maleBague: "SN-2024-014",
    femelleBague: "SN-2023-088",
    saison: "2025",
    statut: "Actif",
    cage: "Cage03",
  },
  {
    id: "2",
    nom: "Paire sud",
    maleBague: "SN-2021-055",
    femelleBague: "SN-2022-201",
    saison: "2025",
    statut: "Actif",
    cage: "Cage05",
  },
  {
    id: "3",
    nom: "Jeunes reproducteurs",
    maleBague: "SN-2024-031",
    femelleBague: "SN-2023-088",
    saison: "2024",
    statut: "Dissous",
    cage: "—",
  },
];

export const MOCK_REPRODUCTIONS = [
  {
    id: "1",
    coupleNom: "Paire nord",
    datePonte: "2025-04-02",
    oeufs: 2,
    eclosionPrev: "2025-04-18",
    statut: "Couvaison",
    jeunes: 0,
    jeunesBagues: "—",
  },
  {
    id: "2",
    coupleNom: "Paire nord",
    datePonte: "2024-08-10",
    dateEclosion: "2024-08-24",
    oeufs: 2,
    eclosionPrev: "2024-08-26",
    statut: "Sevrés",
    jeunes: 2,
    jeunesBagues: "SN-2024-100 (M), SN-2024-101 (F)",
  },
  {
    id: "3",
    coupleNom: "Paire sud",
    datePonte: "2025-03-15",
    dateEclosion: "2025-03-29",
    oeufs: 1,
    eclosionPrev: "2025-03-30",
    statut: "Éclos",
    jeunes: 1,
    jeunesBagues: "SN-2025-020 (M)",
  },
];

/** Sorties du cheptel (vente, décès, perte) — glossaire section 3.4 */
export const MOCK_SORTIES_CHEPTEL = [
  {
    id: "s1",
    type: "vente",
    bague: "SN-2020-400",
    date: "2024-08-15",
    detail: "Acheteur : M. Dupont (colombophile) — 150 €",
  },
  {
    id: "s2",
    type: "deces",
    bague: "SN-2019-111",
    date: "2025-01-03",
    detail: "Cause probable : infection respiratoire",
  },
  {
    id: "s3",
    type: "perte",
    bague: "SN-2023-200",
    date: "2024-11-12",
    detail: "Non retour après lâcher concours (Saint-Louis)",
  },
];

export const MOCK_GENEALOGY = [
  {
    sujet: "SN-2024-014",
    pere: "BE-2019-4401",
    mere: "NL-2018-9022",
    gpPaternel: "BE-2016-1200",
    gmPaternelle: "BE-2017-3301",
    gpMaternel: "NL-2015-5001",
    gmMaternelle: "NL-2016-6102",
    enfants: "SN-2024-100, SN-2024-101 (portée fictive liée à la reproduction #2)",
  },
  {
    sujet: "SN-2023-088",
    pere: "FR-2018-7712",
    mere: "SN-2020-0044",
    gpPaternel: "FR-2015-2001",
    gmPaternelle: "FR-2016-2102",
    gpMaternel: "SN-2017-0881",
    gmMaternelle: "SN-2018-0901",
    enfants: "SN-2024-100, SN-2024-101, SN-2025-020",
  },
];

export const MOCK_USER_SETTINGS = {
  nom: "Thiémokho — Baay Pitàq",
  email: "baay.pitaq@example.com",
  voliere: "Volière Baay Pitàq — Dakar",
  ville: "Dakar",
  fuseau: "Africa/Dakar",
  uniteDistance: "km",
  langue: "Français",
};

export function getPigeonById(id) {
  return MOCK_PIGEONS.find((p) => p.id === String(id));
}

export function getCoupleById(id) {
  return MOCK_COUPLES.find((c) => c.id === String(id));
}
