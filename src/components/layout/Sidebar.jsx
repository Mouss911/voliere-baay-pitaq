import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaDove,
  FaHeart,
  FaEgg,
  FaBorderAll,
  FaFeatherAlt,
  FaDoorOpen,
  FaCog,
} from "react-icons/fa";

export default function Sidebar({ mobileOpen = false, onMobileClose }) {
  const links = [
    { name: "Dashboard", path: "/", icon: FaTachometerAlt },
    { name: "Pigeons", path: "/pigeons", icon: FaDove },
    { name: "Couples", path: "/couples", icon: FaHeart },
    { name: "Reproductions", path: "/reproductions", icon: FaEgg },
    { name: "Cages", path: "/cages", icon: FaBorderAll },
    { name: "Volière (grille)", path: "/voliere", icon: FaFeatherAlt },
    { name: "Sorties cheptel", path: "/sorties", icon: FaDoorOpen },
    { name: "Paramètres", path: "/settings", icon: FaCog },
  ];

  const closeIfMobile = () => {
    onMobileClose?.();
  };

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Fermer le menu"
          onClick={onMobileClose}
        />
      ) : null}

      <aside
        className={[
          "z-50 flex w-64 shrink-0 flex-col bg-gray-900 p-4 text-white",
          "fixed inset-y-0 left-0 min-h-screen transition-transform duration-200 ease-out",
          "lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <header className="-mx-4 -mt-4 mb-8 flex items-center gap-3 border-b border-gray-800 bg-gray-900 px-4 pb-5 pt-4 sm:mb-10">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 sm:h-14 sm:w-14"
            aria-hidden
          >
            <FaDove className="h-6 w-6 text-white opacity-95 sm:h-7 sm:w-7" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold leading-tight text-white sm:text-xl">
              Volière
            </p>
            <p className="mt-0.5 text-sm font-normal leading-tight text-gray-400">
              Baay Pitàq
            </p>
          </div>
        </header>

        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          {links.map(({ path, name, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={closeIfMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg p-3 transition ${
                  isActive ? "bg-green-600" : "hover:bg-gray-800"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}