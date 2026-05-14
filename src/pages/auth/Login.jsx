import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("demo@baay-pitaq.sn");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (login(email)) {
      navigate(from, { replace: true });
      return;
    }
    setError("Saisissez une adresse e-mail (démo : tout compte non vide est accepté).");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Volière Baay Pitàq
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Connexion de démonstration (cahier DTS : au moins un compte). Branchez
          ensuite JWT / OAuth côté API.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">E-mail</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Mot de passe</span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="•••••••• (non vérifié en démo)"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Pas de backend : la session est stockée en{" "}
          <code className="rounded bg-gray-100 px-1">sessionStorage</code>.
        </p>
        <p className="mt-3 text-center text-sm">
          <Link to="/register" className="font-medium text-green-600 hover:text-green-700">
            Créer un compte
          </Link>{" "}
          (maquette)
        </p>
      </div>
    </div>
  );
};
