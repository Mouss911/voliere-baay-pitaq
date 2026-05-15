import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Input, Loader } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import { mapAuthError } from "../../firebase/authErrors";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Renseignez l’e-mail et le mot de passe.");
      return;
    }
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Connecté");
      navigate(from, { replace: true });
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
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Volière Baay Pitàq
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Connexion sécurisée via Firebase Authentication (e-mail / mot de passe).
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            name="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" variant="primary" className="w-full py-2.5" disabled={busy}>
            {busy ? "Connexion…" : "Se connecter"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Les données volière sont stockées dans Cloud Firestore (isolées par
          compte).
        </p>
        <p className="mt-3 text-center text-sm">
          <Link
            to="/register"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};
