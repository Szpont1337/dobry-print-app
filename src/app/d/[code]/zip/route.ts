import JSZip from "jszip";

import { api } from "@convex/_generated/api";

import { getConvexHttp } from "@/lib/serverEnv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Large print files (up to 500 MB each) — give the function room to fetch and
// pack them. Fluid Compute allows up to 300 s.
export const maxDuration = 300;

// Disambiguate identical file names inside the archive (e.g. two "projekt.pdf").
function uniqueName(name: string, seen: Set<string>): string {
  if (!seen.has(name)) {
    seen.add(name);
    return name;
  }
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : "";
  let i = 2;
  let candidate = `${base} (${i})${ext}`;
  while (seen.has(candidate)) {
    i += 1;
    candidate = `${base} (${i})${ext}`;
  }
  seen.add(candidate);
  return candidate;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  let data;
  try {
    data = await getConvexHttp().action(api.storage.getShareDownloadUrls, {
      code,
    });
  } catch {
    return new Response("Link wygasł lub nie istnieje.", { status: 404 });
  }

  if (data.files.length === 0) {
    return new Response("Brak plików do pobrania.", { status: 404 });
  }

  const zip = new JSZip();
  const seen = new Set<string>();

  for (const file of data.files) {
    const res = await fetch(file.url);
    if (!res.ok) {
      return new Response(
        `Nie udało się pobrać pliku „${file.fileName}" z magazynu.`,
        { status: 502 },
      );
    }
    const buf = await res.arrayBuffer();
    // STORE (no compression): print files (PDF/JPG/TIFF) are already
    // compressed, so deflating wastes CPU for ~0 size gain.
    zip.file(uniqueName(file.fileName, seen), buf);
  }

  const archive = await zip.generateAsync({
    type: "uint8array",
    compression: "STORE",
  });

  const fileName = `dobreprinty-${data.orderShortId}.zip`;
  // Uint8Array is a valid body at runtime; the cast sidesteps a TS variance
  // mismatch (Uint8Array<ArrayBufferLike> vs BodyInit) in the lib types.
  return new Response(archive as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": String(archive.byteLength),
      "Cache-Control": "no-store",
    },
  });
}
