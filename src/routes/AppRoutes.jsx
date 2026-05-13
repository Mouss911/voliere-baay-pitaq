import { Routes, Route } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Layouts
|--------------------------------------------------------------------------
*/
import DashboardLayout from "../components/layout/DashboardLayout";

/*
|--------------------------------------------------------------------------
| Auth Pages
|--------------------------------------------------------------------------
*/
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/
import Dashboard from "../pages/dashboard/Dashboard";

/*
|--------------------------------------------------------------------------
| Pigeons
|--------------------------------------------------------------------------
*/
import PigeonsList from "../pages/pigeons/PigeonsList";
import { CreatePigeon } from "../pages/pigeons/CreatePigeon";
import { EditPigeon } from "../pages/pigeons/EditPigeon";
import { ShowPigeon } from "../pages/pigeons/ShowPigeon";

/*
|--------------------------------------------------------------------------
| Couples
|--------------------------------------------------------------------------
*/
import { CouplesList } from "../pages/couples/CouplesList";
import { CreateCouple } from "../pages/couples/CreateCouple";
import { ShowCouple } from "../pages/couples/ShowCouple";

/*
|--------------------------------------------------------------------------
| Reproductions
|--------------------------------------------------------------------------
*/
import { ReproductionsList } from "../pages/reproductions/ReproductionsList";
import { CreateReproduction } from "../pages/reproductions/CreateReproduction";
import { Genealogy } from "../pages/reproductions/Genealogy";

/*
|--------------------------------------------------------------------------
| Cages
|--------------------------------------------------------------------------
*/
import { CagesList } from "../pages/cages/CagesList";
import { CreateCage } from "../pages/cages/CreateCage";
import { VoliereView } from "../pages/cages/VoliereView";

/*
|--------------------------------------------------------------------------
| Sorties
|--------------------------------------------------------------------------
*/
import { SortiesList } from "../pages/sorties/SortiesList";

/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/
import { Settings } from "../pages/settings/Settings";

/*
|--------------------------------------------------------------------------
| Errors
|--------------------------------------------------------------------------
*/
import NotFound from "../pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= DASHBOARD LAYOUT ================= */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Pigeons */}
        <Route path="pigeons" element={<PigeonsList />} />
        <Route path="pigeons/create" element={<CreatePigeon />} />
        <Route path="pigeons/:id" element={<ShowPigeon />} />
        <Route path="pigeons/:id/edit" element={<EditPigeon />} />

        {/* Couples */}
        <Route path="couples" element={<CouplesList />} />
        <Route path="couples/create" element={<CreateCouple />} />
        <Route path="couples/:id" element={<ShowCouple />} />

        {/* Reproductions */}
        <Route path="reproductions" element={<ReproductionsList />} />
        <Route
          path="reproductions/create"
          element={<CreateReproduction />}
        />
        <Route path="genealogy" element={<Genealogy />} />

        {/* Cages */}
        <Route path="cages" element={<CagesList />} />
        <Route path="cages/create" element={<CreateCage />} />

        {/* Volière */}
        <Route path="voliere" element={<VoliereView />} />

        {/* Sorties */}
        <Route path="sorties" element={<SortiesList />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}