import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Input, Loader, PasswordInput } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import { mapAuthError } from "../../firebase/authErrors";

export const Register = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setBusy(true);
    try {
      await register(email, password, nom);
      toast.success("Compte créé — bienvenue !");
      navigate("/", { replace: true });
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <Loader message="Initialisation…" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-xl font-bold text-gray-900">
          Créer un compte
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Un jeu de données de démo sera copié dans votre espace Firestore au
          premier chargement du tableau de bord.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Nom affiché"
            name="displayName"
            type="text"
            autoComplete="name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <Input
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Mot de passe"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirmer le mot de passe"
            name="password2"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" variant="primary" className="w-full py-2.5" disabled={busy}>
            {busy ? "Création…" : "S’inscrire"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="font-medium text-green-600 hover:text-green-700">
            Déjà un compte ? Connexion
          </Link>
        </p>
      </div>
    </div>
  );
};
