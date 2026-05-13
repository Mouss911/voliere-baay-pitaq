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

export default function Sidebar() {
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

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-10 text-center">
        Volière App
      </h1>

      <nav className="flex flex-col gap-2">
        {links.map(({ path, name, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-green-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}