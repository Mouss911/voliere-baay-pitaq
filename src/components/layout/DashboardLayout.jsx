import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Loader } from "../ui";
import { useAuth } from "../../context/AuthContext";
import {
  useVoliere,
  VoliereDataProvider,
} from "../../context/VoliereDataContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user } = useAuth();

  return (
    <VoliereDataProvider userId={user?.uid}>
      <div className="flex min-h-screen min-w-0">
        <Sidebar
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={() => setMobileNavOpen(true)} />

          <main className="min-w-0 flex-1 overflow-x-auto p-4 sm:p-6">
            <DashboardOutlet />
          </main>
        </div>
      </div>
    </VoliereDataProvider>
  );
}

function DashboardOutlet() {
  const { loading, error } = useVoliere();

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-900">
        <p className="font-medium">Impossible de charger les données</p>
        <p className="mt-2 text-sm">{error}</p>
        <p className="mt-4 text-sm text-red-800">
          Vérifiez les règles Firestore et que le projet Firebase est correctement
          configuré.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <Loader fullScreen={false} message="Chargement de la volière…" className="min-h-[50vh]" />
    );
  }

  return <Outlet />;
}
