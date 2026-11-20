export interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export interface UploadAvatarResponse {
  url: string;
}

export const AVATAR_MAX_SIZE_BYTES = 2 * 1024 * 1024;
export const AVATAR_ALLOWED_MIME_TYPES = /^image\/(jpeg|png|webp)$/;
