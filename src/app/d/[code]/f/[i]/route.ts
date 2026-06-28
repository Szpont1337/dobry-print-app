import { api } from "@convex/_generated/api";

import { getConvexHttp } from "@/lib/serverEnv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Redirects to a freshly-minted presigned B2 URL for a single file in the
// order behind <code>. Keeps long signed URLs out of the page HTML and lets
// each download be re-signed on demand.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string; i: string }> },
) {
  const { code, i } = await params;
  const index = Number.parseInt(i, 10);

  let data;
  try {
    data = await getConvexHttp().action(api.storage.getShareDownloadUrls, {
      code,
    });
  } catch {
    return new Response("Link wygasł lub nie istnieje.", { status: 404 });
  }

  const file = Number.isInteger(index) ? data.files[index] : undefined;
  if (!file) {
    return new Response("Nie znaleziono pliku.", { status: 404 });
  }

  return Response.redirect(file.url, 302);
}
