// Shared server-side upload constraints. Mirrors the client allow-list in
// UploadPlikDoDruku.tsx, but enforced where it counts — a direct call to the
// Convex actions/mutations can't bypass it.
export const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  ".pdf",
  ".ai",
  ".eps",
  ".ps",
  ".svg",
  ".cdr",
  ".png",
  ".jpg",
  ".jpeg",
  ".tif",
  ".tiff",
  ".bmp",
  ".gif",
  ".webp",
  ".heic",
  ".heif",
  ".psd",
]);

export const MAX_UPLOAD_BYTES = 500 * 1024 * 1024; // 500 MB
export const UPLOAD_KEY_PREFIX = "zamowienia/";

export function extensionOf(fileName: string): string {
  const i = fileName.lastIndexOf(".");
  return i >= 0 ? fileName.slice(i).toLowerCase() : "";
}

export function isAllowedFileName(fileName: string): boolean {
  return ALLOWED_UPLOAD_EXTENSIONS.has(extensionOf(fileName));
}
