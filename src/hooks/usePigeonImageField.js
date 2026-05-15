import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { validatePigeonImage } from "../lib/cloudinaryUpload";

/**
 * Gestion fichier + aperçu pour formulaire pigeon.
 * @param {string | null | undefined} [initialUrl]
 */
export function usePigeonImageField(initialUrl) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cleared, setCleared] = useState(false);

  const displayUrl = imagePreview ?? (!cleared ? initialUrl : null) ?? null;

  const selectFile = useCallback((file) => {
    try {
      validatePigeonImage(file);
      setImageFile(file);
      setCleared(false);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Fichier invalide");
    }
  }, []);

  const clearImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setCleared(true);
  }, []);

  return {
    imageFile,
    displayUrl,
    selectFile,
    clearImage,
    cleared,
  };
}
