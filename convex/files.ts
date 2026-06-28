import { v } from "convex/values";

import { mutation } from "./_generated/server";
import {
  MAX_UPLOAD_BYTES,
  UPLOAD_KEY_PREFIX,
  isAllowedFileName,
} from "./uploadRules";

export const saveFileMetadata = mutation({
  args: {
    fileKey: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(),
    zamowienieId: v.optional(v.id("orders")),
  },
  handler: async (ctx, args) => {
    if (!args.fileKey.startsWith(UPLOAD_KEY_PREFIX)) {
      throw new Error("Nieprawidłowy klucz pliku.");
    }
    if (
      !Number.isFinite(args.fileSize) ||
      args.fileSize <= 0 ||
      args.fileSize > MAX_UPLOAD_BYTES
    ) {
      throw new Error("Nieprawidłowy rozmiar pliku.");
    }
    if (!isAllowedFileName(args.fileName)) {
      throw new Error("Niedozwolony typ pliku.");
    }
    return await ctx.db.insert("pliki_zamowien", {
      fileKey: args.fileKey,
      fileName: args.fileName,
      fileSize: args.fileSize,
      fileType: args.fileType,
      status: "oczekuje_weryfikacji",
      zamowienieId: args.zamowienieId,
    });
  },
});
