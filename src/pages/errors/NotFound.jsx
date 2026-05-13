import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-500">
        404
      </h1>

      <p className="text-gray-600 mt-4">
        Page introuvable
      </p>

      <Link
        to="/"
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}