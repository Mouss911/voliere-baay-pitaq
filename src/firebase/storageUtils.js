import { uploadImageToCloudinary } from "../lib/cloudinaryUpload";

/**
 * Upload une image pigeon (Cloudinary).
 * @param {string} userId
 * @param {File} file
 * @param {string} [folder]
 * @returns {Promise<string>}
 */
export async function uploadImage(userId, file, folder = "pigeons") {
  return uploadImageToCloudinary(file, { userId, folder });
}
