import { NextResponse } from "next/server";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { shapeFulfillmentPayload, verifyFulfillmentToken } from "@/lib/allegro";
import { getConvexHttp, getServerSecret } from "@/lib/serverEnv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The extension background worker fetches this with host_permissions (bypasses
// page CORS), but we set permissive CORS anyway: the payload is gated by the
// unguessable 5-min HMAC token, not by origin.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Cache-Control": "no-store",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("t");

  const verified = token ? verifyFulfillmentToken(token) : null;
  if (!verified) {
    return NextResponse.json(
      { error: "Token nieprawidłowy lub wygasł." },
      { status: 401, headers: CORS },
    );
  }

  try {
    const convex = getConvexHttp();
    const order = await convex.query(api.orders.getById, {
      serverSecret: getServerSecret(),
      id: verified.orderId as Id<"orders">,
    });
    if (!order) {
      return NextResponse.json(
        { error: "Zamówienie nie istnieje." },
        { status: 404, headers: CORS },
      );
    }
    return NextResponse.json(shapeFulfillmentPayload(order), {
      headers: CORS,
    });
  } catch (err) {
    console.error("[allegro/fulfillment]", err);
    return NextResponse.json(
      { error: "Błąd serwera." },
      { status: 500, headers: CORS },
    );
  }
}
