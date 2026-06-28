import { NextResponse } from "next/server";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { signFulfillmentToken } from "@/lib/allegro";
import { getConvexHttp, getServerSecret } from "@/lib/serverEnv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  token?: string; // admin session token
  orderId?: string;
};

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

    // Gate on the same admin session token the dashboard already uses.
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

    const offer = await convex.query(api.allegro.getOfferForSlug, {
      serverSecret,
      productSlug: order.productSlug,
    });

    // No mapping → 200 with an error code so the UI can switch to the
    // clipboard fallback rather than surfacing an HTTP failure.
    if (!offer) {
      return NextResponse.json({
        error: "no_offer",
        productSlug: order.productSlug,
      });
    }

    const fulfillmentToken = signFulfillmentToken(orderId);
    return NextResponse.json({
      offerUrl: offer.offerUrl,
      token: fulfillmentToken,
      variantNote: offer.variantNote,
    });
  } catch (err) {
    console.error("[allegro/prepare]", err);
    return NextResponse.json(
      { error: "Błąd serwera." },
      { status: 500 },
    );
  }
}
