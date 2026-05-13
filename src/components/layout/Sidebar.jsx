import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaDove,
  FaHeart,
  FaEgg,
  FaBorderAll,
  FaFeatherAlt,
  FaRoute,
  FaCog,
} from "react-icons/fa";

export default function Sidebar({ mobileOpen = false, onMobileClose }) {
  const links = [
    { name: "Dashboard", path: "/", icon: FaTachometerAlt },
    { name: "Pigeons", path: "/pigeons", icon: FaDove },
    { name: "Couples", path: "/couples", icon: FaHeart },
    { name: "Reproductions", path: "/reproductions", icon: FaEgg },
    { name: "Cages", path: "/cages", icon: FaBorderAll },
    { name: "Volière", path: "/voliere", icon: FaFeatherAlt },
    { name: "Sorties", path: "/sorties", icon: FaRoute },
    { name: "Settings", path: "/settings", icon: FaCog },
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
        <h1 className="mb-8 text-center text-xl font-bold sm:mb-10 sm:text-2xl">
          Volière App
        </h1>

        <nav className="flex flex-col gap-2 overflow-y-auto">
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