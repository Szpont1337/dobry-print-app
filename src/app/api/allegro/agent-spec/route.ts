import { NextResponse } from "next/server";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { buildAgentPrompt, buildAgentSpec } from "@/lib/allegro";
import { getConvexHttp, getServerSecret, getSiteUrl } from "@/lib/serverEnv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  token?: string; // admin session token
  orderId?: string;
};

// Builds the structured task spec + ready-to-paste prompt for fulfilling an
// order on Allegro (Claude for Chrome, the extension, or a human). Also mints /
// reuses a ZIP share link so the print files travel as one URL in the seller
// note. Admin-gated with the same session token the dashboard uses.
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Body;
    const { token, orderId } = body;
    if (!token || !orderId) {
      return NextResponse.json(
        { error: "Brak token / orderId." },
        { status: 400 },
      );
    }

    const convex = getConvexHttp();

    const admin = await convex.query(api.admin.isAdmin, { token });
    if (!admin) {
      return NextResponse.json(
        { error: "Brak uprawnień administratora." },
        { status: 403 },
      );
    }

    const serverSecret = getServerSecret();
    const order = await convex.query(api.orders.getById, {
      serverSecret,
      id: orderId as Id<"orders">,
    });
    if (!order) {
      return NextResponse.json(
        { error: "Zamówienie nie istnieje." },
        { status: 404 },
      );
    }

    // Allegro offer mapping (may be absent → spec carries offerUrl: null and the
    // agent is told to stop).
    const offer = await convex.query(api.allegro.getOfferForSlug, {
      serverSecret,
      productSlug: order.productSlug,
    });

    // Stable ZIP short link for the print files.
    const { code } = await convex.mutation(api.shareLinks.createForOrder, {
      token,
      orderId: orderId as Id<"orders">,
    });
    const projectFilesUrl = `${getSiteUrl()}/d/${code}`;

    const spec = buildAgentSpec(order, {
      offerUrl: offer?.offerUrl ?? null,
      variantNote: offer?.variantNote ?? null,
      projectFilesUrl,
    });

    return NextResponse.json({ spec, prompt: buildAgentPrompt(spec) });
  } catch (err) {
    console.error("[allegro/agent-spec]", err);
    return NextResponse.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
