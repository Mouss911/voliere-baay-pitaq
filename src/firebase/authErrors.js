/** @param {import('firebase/auth').AuthError | Error | null | undefined} err */
export function mapAuthError(err) {
  const code = err && "code" in err ? err.code : "";
  switch (code) {
    case "auth/invalid-email":
      return "Adresse e-mail invalide.";
    case "auth/user-disabled":
      return "Ce compte a été désactivé.";
    case "auth/user-not-found":
      return "Aucun compte pour cette adresse e-mail.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-mail ou mot de passe incorrect.";
    case "auth/email-already-in-use":
      return "Cette adresse e-mail est déjà utilisée.";
    case "auth/weak-password":
      return "Mot de passe trop faible (au moins 6 caractères).";
    case "auth/too-many-requests":
      return "Trop de tentatives. Réessayez plus tard.";
    case "auth/network-request-failed":
      return "Erreur réseau. Vérifiez votre connexion.";
    default:
      return err?.message || "Une erreur d’authentification s’est produite.";
  }
}
