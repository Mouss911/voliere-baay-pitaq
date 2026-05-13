import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Gestion de Volière
        </h2>

        <div>
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            <FaSignOutAlt className="h-4 w-4 shrink-0" aria-hidden />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}