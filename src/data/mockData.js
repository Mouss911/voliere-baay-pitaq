/** Données fictives — à remplacer par les appels API */

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
    statut: "Repos",
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
];

export const MOCK_COUPLES = [
  {
    id: "1",
    nom: "Paire nord",
    maleBague: "SN-2024-014",
    femelleBague: "SN-2023-088",
    saison: "2025",
    statut: "Couvaison",
    cage: "A-12",
  },
  {
    id: "2",
    nom: "Paire sud",
    maleBague: "SN-2021-055",
    femelleBague: "SN-2022-201",
    saison: "2025",
    statut: "Repos",
    cage: "A-08",
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
  },
  {
    id: "2",
    coupleNom: "Paire nord",
    datePonte: "2024-08-10",
    oeufs: 2,
    eclosionPrev: "2024-08-26",
    statut: "Sevrés",
    jeunes: 2,
  },
  {
    id: "3",
    coupleNom: "Paire sud",
    datePonte: "2025-03-15",
    oeufs: 1,
    eclosionPrev: "2025-03-30",
    statut: "Éclos",
    jeunes: 1,
  },
];

export const MOCK_CAGES = [
  { id: "1", code: "A-01", zone: "Bloc A", etage: 1, type: "Couple", occupant: "SN-2024-031", statut: "Occupée" },
  { id: "2", code: "A-08", zone: "Bloc A", etage: 1, type: "Couple", occupant: "Paire sud", statut: "Occupée" },
  { id: "3", code: "A-12", zone: "Bloc A", etage: 2, type: "Couple", occupant: "Paire nord", statut: "Occupée" },
  { id: "4", code: "B-03", zone: "Bloc B", etage: 1, type: "Jeunes", occupant: "12 sujets", statut: "Occupée" },
  { id: "5", code: "B-07", zone: "Bloc B", etage: 1, type: "Quarantaine", occupant: "—", statut: "Libre" },
  { id: "6", code: "B-11", zone: "Bloc B", etage: 2, type: "Couple", occupant: "—", statut: "Libre" },
];

export const MOCK_SORTIES = [
  {
    id: "1",
    date: "2025-05-10",
    type: "Entraînement",
    distanceKm: 40,
    liberes: 28,
    retours: 27,
    lieu: "Thiès",
    meteo: "Vent NE léger",
  },
  {
    id: "2",
    date: "2025-05-03",
    type: "Entraînement",
    distanceKm: 25,
    liberes: 30,
    retours: 30,
    lieu: "Dakar",
    meteo: "Clair",
  },
  {
    id: "3",
    date: "2025-04-28",
    type: "Concours",
    distanceKm: 180,
    liberes: 18,
    retours: 16,
    lieu: "Saint-Louis",
    meteo: "Chaud",
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
  },
  {
    sujet: "SN-2023-088",
    pere: "FR-2018-7712",
    mere: "SN-2020-0044",
    gpPaternel: "FR-2015-2001",
    gmPaternelle: "FR-2016-2102",
    gpMaternel: "SN-2017-0881",
    gmMaternelle: "SN-2018-0901",
  },
];

export const MOCK_USER_SETTINGS = {
  nom: "Aminata Diallo",
  email: "aminata.diallo@example.com",
  voliere: "Volière Baay Pitaq",
  ville: "Dakar",
  fuseau: "UTC±0 (Afrique/Dakar)",
  uniteDistance: "km",
  langue: "Français",
};

export function getPigeonById(id) {
  return MOCK_PIGEONS.find((p) => p.id === String(id));
}

export function getCoupleById(id) {
  return MOCK_COUPLES.find((c) => c.id === String(id));
}
