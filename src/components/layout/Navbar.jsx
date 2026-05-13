import { FaBars, FaSignOutAlt } from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="shrink-0 bg-white px-4 py-3 shadow sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={onMenuClick}
          >
            <FaBars className="h-5 w-5 shrink-0" aria-hidden />
          </button>
          <h2 className="truncate text-lg font-semibold sm:text-xl">
            Gestion de Volière
          </h2>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm text-white sm:px-4 sm:text-base"
          aria-label="Déconnexion"
        >
          <FaSignOutAlt className="h-4 w-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
