import { Link } from "react-router-dom";

import {
  Badge,
  Button,
  EmptyState,
  pigeonStatutVariant,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../../components/ui";
import { useVoliere } from "../../context/VoliereDataContext";

export default function PigeonsList() {
  const { pigeons } = useVoliere();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pigeons</h1>
          <p className="mt-1 text-sm text-gray-500">
            Liste synchronisée avec Firestore — création et modification
            enregistrées côté cloud.
          </p>
        </div>
        <Button to="/pigeons/create" variant="primary">
          Ajouter un pigeon
        </Button>
      </div>

      {pigeons.length === 0 ? (
        <EmptyState
          title="Aucun pigeon"
          description="Ajoutez votre premier pigeon ou vérifiez que les données Firestore sont bien chargées."
        >
          <Button to="/pigeons/create" variant="primary">
            Nouveau pigeon
          </Button>
        </EmptyState>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Bague</TableHeaderCell>
                <TableHeaderCell>Sexe</TableHeaderCell>
                <TableHeaderCell>Couleur</TableHeaderCell>
                <TableHeaderCell>Naissance</TableHeaderCell>
                <TableHeaderCell>Statut</TableHeaderCell>
                <TableHeaderCell>Lignée</TableHeaderCell>
                <TableHeaderCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {pigeons.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-gray-900">{p.bague}</TableCell>
                  <TableCell className="text-gray-600">{p.sexe}</TableCell>
                  <TableCell className="text-gray-600">{p.couleur}</TableCell>
                  <TableCell className="text-gray-600">{p.naissance}</TableCell>
                  <TableCell>
                    <Badge variant={pigeonStatutVariant(p.statut)}>{p.statut}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{p.lignee}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={`/pigeons/${p.id}`}
                      className="font-medium text-green-600 hover:text-green-700"
                    >
                      Fiche
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
