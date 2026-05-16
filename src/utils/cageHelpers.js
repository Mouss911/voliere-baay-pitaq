export function occupationResume(c) {
  if (!c || !c.typeOccupation) return "—";
  if (c.typeOccupation === "libre") return "Libre";
  if (c.typeOccupation === "pigeon_seul") return c.pigeonSoloBague ?? "—";
  if (c.typeOccupation === "couple") return `${c.coupleMale ?? "?"} + ${c.coupleFemelle ?? "?"}`;
  return "—";
}

export function occupationCourt(c) {
  if (!c || !c.typeOccupation) return "—";
  if (c.typeOccupation === "libre") return "Libre";
  if (c.typeOccupation === "pigeon_seul") return c.pigeonSoloBague ?? "";
  return "Couple";
}
