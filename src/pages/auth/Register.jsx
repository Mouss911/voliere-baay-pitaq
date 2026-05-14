import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <h1 className="text-xl font-bold text-gray-900">Création de compte</h1>
        <p className="mt-3 text-sm text-gray-600">
          Maquette non branchée — le cahier DTS exige une authentification ; la
          démo se fait via la page de connexion.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          Aller à la connexion
        </Link>
      </div>
    </div>
  );
};
