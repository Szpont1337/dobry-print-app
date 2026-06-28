"use node";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v } from "convex/values";

import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { UPLOAD_KEY_PREFIX, isAllowedFileName } from "./uploadRules";

function client() {
  const endpoint = process.env.B2_ENDPOINT;
  const region = process.env.B2_REGION;
  const accountId = process.env.B2_ACCOUNT_ID;
  const applicationKey = process.env.B2_APPLICATION_KEY;
  if (!endpoint || !region || !accountId || !applicationKey) {
    throw new Error(
      "Brak konfiguracji B2. Ustaw B2_ENDPOINT, B2_REGION, B2_ACCOUNT_ID, B2_APPLICATION_KEY w env Convexa.",
    );
  }
  return new S3Client({
    endpoint: `https://${endpoint}`,
    region,
    credentials: {
      accessKeyId: accountId,
      secretAccessKey: applicationKey,
    },
    forcePathStyle: true,
  });
}

function sanitize(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 180);
}

export const generateUploadUrl = action({
  args: {
    fileName: v.string(),
    fileType: v.string(),
  },
  handler: async (_ctx, args) => {
    const bucket = process.env.B2_BUCKET_NAME;
    if (!bucket) {
      throw new Error("Brak B2_BUCKET_NAME w env Convexa.");
    }
    if (!isAllowedFileName(args.fileName)) {
      throw new Error("Niedozwolony typ pliku.");
    }
    const fileKey = `${UPLOAD_KEY_PREFIX}${Date.now()}-${sanitize(args.fileName)}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      ContentType: args.fileType,
    });
    const uploadUrl = await getSignedUrl(client(), command, {
      expiresIn: 3600,
    });
    return { uploadUrl, fileKey };
  },
});

// Public download URLs for a share link's order. No admin token — access is
// gated by the unguessable code, validated inside shareLinks.resolve. Returns
// short-lived presigned GET URLs for every file attached to the order.
export const getShareDownloadUrls = action({
  args: { code: v.string() },
  // Explicit return type: the handler calls internal.shareLinks.resolve, which
  // pulls the whole `internal` API graph (including this action) back into the
  // inferred type — annotating breaks that cycle.
  handler: async (
    ctx,
    args,
  ): Promise<{
    orderShortId: string;
    files: { fileName: string; fileSize: number; url: string }[];
  }> => {
    const resolved = await ctx.runQuery(internal.shareLinks.resolve, {
      code: args.code,
    });
    if (!resolved) {
      throw new Error("Link wygasł lub nie istnieje.");
    }
    const bucket = process.env.B2_BUCKET_NAME;
    if (!bucket) {
      throw new Error("Brak B2_BUCKET_NAME w env Convexa.");
    }
    const s3 = client();
    const files = await Promise.all(
      resolved.files.map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: bucket,
          Key: file.fileKey,
          ResponseContentDisposition: `attachment; filename="${sanitize(file.fileName)}"`,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return { fileName: file.fileName, fileSize: file.fileSize, url };
      }),
    );
    return { orderShortId: resolved.orderShortId, files };
  },
});

export const generateDownloadUrl = action({
  args: { token: v.string(), fileKey: v.string() },
  handler: async (ctx, args) => {
    const isAdmin = await ctx.runQuery(internal.admin.ensureAdmin, {
      token: args.token,
    });
    if (!isAdmin) {
      throw new Error("Brak uprawnień administratora.");
    }
    if (!args.fileKey.startsWith(UPLOAD_KEY_PREFIX)) {
      throw new Error("Nieprawidłowy klucz pliku.");
    }
    const bucket = process.env.B2_BUCKET_NAME;
    if (!bucket) {
      throw new Error("Brak B2_BUCKET_NAME w env Convexa.");
    }
    const fileName = args.fileKey.split("/").pop() ?? "plik";
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: args.fileKey,
      ResponseContentDisposition: `attachment; filename="${sanitize(fileName)}"`,
    });
    return await getSignedUrl(client(), command, {
      expiresIn: 7 * 24 * 60 * 60,
    });
  },
});
