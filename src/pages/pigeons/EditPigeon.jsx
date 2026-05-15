import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, ImageUpload } from "../../components/ui";
import { useVoliere } from "../../context/VoliereDataContext";
import { useAuth } from "../../context/AuthContext";
import { usePigeonImageField } from "../../hooks/usePigeonImageField";
import { uploadImage } from "../../firebase/storageUtils";

function EditPigeonForm({ pigeon, updatePigeon }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bague, setBague] = useState(pigeon.bague ?? "");
  const [sexe, setSexe] = useState(pigeon.sexe ?? "M");
  const [statut, setStatut] = useState(pigeon.statut ?? "Actif");
  const [couleur, setCouleur] = useState(pigeon.couleur ?? "");
  const [naissance, setNaissance] = useState(pigeon.naissance ?? "");
  const [lignee, setLignee] = useState(pigeon.lignee ?? "");
  const [notes, setNotes] = useState(pigeon.notes ?? "");
  const [busy, setBusy] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { imageFile, displayUrl, selectFile, clearImage, cleared } =
    usePigeonImageField(pigeon.imageUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      let imageUrl = cleared ? null : pigeon.imageUrl;

      if (imageFile) {
        if (!user?.uid) {
          toast.error("Connectez-vous pour envoyer une image.");
          return;
        }
        setUploadingImage(true);
        try {
          imageUrl = await uploadImage(user.uid, imageFile, "pigeons");
        } finally {
          setUploadingImage(false);
        }
      }

      await updatePigeon(pigeon.id, {
        bague: bague.trim(),
        sexe,
        statut: statut.trim(),
        couleur: couleur.trim(),
        naissance: naissance.trim(),
        lignee: lignee.trim(),
        notes: notes.trim(),
        imageUrl: imageUrl || null,
      });
      toast.success("Fiche mise à jour");
      navigate(`/pigeons/${pigeon.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur à la mise à jour");
    } finally {
      setBusy(false);
      setUploadingImage(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to={`/pigeons/${pigeon.id}`}
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Fiche {pigeon.bague}
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Modifier {pigeon.bague}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Firestore + photo Cloudinary.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Bague</span>
          <input
            type="text"
            value={bague}
            onChange={(e) => setBague(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Sexe</span>
            <select
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Statut</span>
            <input
              type="text"
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Naissance</span>
            <input
              type="text"
              value={naissance}
              onChange={(e) => setNaissance(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Couleur</span>
            <input
              type="text"
              value={couleur}
              onChange={(e) => setCouleur(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Lignée</span>
            <input
              type="text"
              value={lignee}
              onChange={(e) => setLignee(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Notes</span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>

          <ImageUpload
            previewUrl={displayUrl}
            onFileSelect={selectFile}
            onClear={clearImage}
            disabled={busy || uploadingImage}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={busy || uploadingImage}
          >
            {uploadingImage
              ? "Envoi de l'image…"
              : busy
                ? "Mise à jour…"
                : "Mettre à jour"}
          </Button>
          <Link
            to={`/pigeons/${pigeon.id}`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export const EditPigeon = () => {
  const { id } = useParams();
  const { getPigeonById, updatePigeon } = useVoliere();
  const pigeon = getPigeonById(id);

  if (!pigeon) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Pigeon introuvable</h1>
        <Link to="/pigeons" className="text-green-600 hover:text-green-700">
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <EditPigeonForm key={pigeon.id} pigeon={pigeon} updatePigeon={updatePigeon} />
  );
};
