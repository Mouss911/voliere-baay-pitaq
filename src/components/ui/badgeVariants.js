/** @param {string} statut */
export function pigeonStatutVariant(statut) {
  const map = {
    Actif: "success",
    Jeune: "info",
    Repos: "neutral",
    Vendu: "info",
    Mort: "muted",
    Perdu: "warning",
  };
  return map[statut] ?? "neutral";
}
