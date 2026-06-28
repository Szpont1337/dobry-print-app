"use node";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { UPLOAD_KEY_PREFIX } from "./uploadRules";

// Minimal-but-openable PDF so the ZIP download yields a real file on dev.
const TEST_PDF = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 1190] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 58 >>
stream
BT /F1 48 Tf 80 1000 Td (DobrePrinty TEST - Plakat A3) Tj ET
endstream
endobj
trailer
<< /Root 1 0 R >>
%%EOF`;

function s3() {
  const endpoint = process.env.B2_ENDPOINT;
  const region = process.env.B2_REGION;
  const accountId = process.env.B2_ACCOUNT_ID;
  const applicationKey = process.env.B2_APPLICATION_KEY;
  if (!endpoint || !region || !accountId || !applicationKey) {
    throw new Error("Brak konfiguracji B2 w env Convexa.");
  }
  return new S3Client({
    endpoint: `https://${endpoint}`,
    region,
    credentials: { accessKeyId: accountId, secretAccessKey: applicationKey },
    forcePathStyle: true,
  });
}

// Dev-only: upload a test print file to B2, then create the seeded paid order.
export const run = action({
  args: {},
  handler: async (ctx): Promise<{ orderId: string; fileKey: string }> => {
    const bucket = process.env.B2_BUCKET_NAME;
    if (!bucket) throw new Error("Brak B2_BUCKET_NAME w env Convexa.");

    const fileName = "plakat-a3-test.pdf";
    const body = Buffer.from(TEST_PDF, "utf8");
    const fileKey = `${UPLOAD_KEY_PREFIX}${Date.now()}-${fileName}`;

    await s3().send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileKey,
        Body: body,
        ContentType: "application/pdf",
      }),
    );

    const { orderId } = await ctx.runMutation(internal.seedDevDb.insertSeed, {
      fileKey,
      fileName,
      fileSize: body.byteLength,
      fileType: "application/pdf",
    });

    return { orderId, fileKey };
  },
});
