const VALID_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

function getCloudinaryConfig() {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary non configuré : ajoutez VITE_CLOUDINARY_CLOUD_NAME et VITE_CLOUDINARY_UPLOAD_PRESET dans le fichier .env (voir .env.example)."
    );
  }
  return { cloudName, uploadPreset };
}

/**
 * @param {File} file
 */
export function validatePigeonImage(file) {
  if (!file) throw new Error("Aucun fichier sélectionné");
  if (!VALID_TYPES.includes(file.type)) {
    throw new Error("Seules les images JPEG, PNG, WebP et GIF sont acceptées");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("L'image ne doit pas dépasser 5 Mo");
  }
}

/**
 * Envoie une image vers Cloudinary (upload non signé, preset requis).
 * @param {File} file
 * @param {{ userId?: string; folder?: string }} [options]
 * @returns {Promise<string>} URL HTTPS de l'image
 */
export async function uploadImageToCloudinary(file, options = {}) {
  validatePigeonImage(file);
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  const { userId, folder = "pigeons" } = options;

  const cloudFolder = userId
    ? `voliere-baay-pitaq/${userId}/${folder}`
    : `voliere-baay-pitaq/${folder}`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", cloudFolder);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, { method: "POST", body: formData });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const apiMsg = data?.error?.message || "";
    if (/upload preset not found/i.test(apiMsg)) {
      throw new Error(
        `Preset « ${uploadPreset} » introuvable sur Cloudinary. Créez-le dans Settings → Upload → Add upload preset (mode Unsigned), ou mettez le bon nom dans .env (VITE_CLOUDINARY_UPLOAD_PRESET).`
      );
    }
    throw new Error(apiMsg || `Échec de l'envoi Cloudinary (${response.status})`);
  }

  if (!data.secure_url) {
    throw new Error("Cloudinary n'a pas renvoyé d'URL d'image.");
  }

  return data.secure_url;
}
