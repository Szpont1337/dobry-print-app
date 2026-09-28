import { createMcpHandler } from "mcp-handler";

import { matchBrand } from "@/lib/brands";
import { registerDrukaloTools, SERVER_INFO, SERVER_INSTRUCTIONS } from "@/lib/mcp/server";

// Serwer MCP (Streamable HTTP, bezstanowy, bez logowania) dla ChatGPT / Claude.
// Instrukcja podpięcia: /mcp. Katalog i ceny czytane z products.ts, więc
// odpowiedzi są zawsze zgodne ze sklepem. Handler budowany per żądanie, bo
// domyślna marka (linki do dobreprinty.pl vs drukalo.pl) zależy od hosta.
function handler(request: Request): Promise<Response> {
  const brand = matchBrand(request.headers.get("host")) ?? "dobreprinty";
  return createMcpHandler((server) => registerDrukaloTools(server, brand), {
    serverInfo: SERVER_INFO,
    instructions: SERVER_INSTRUCTIONS,
  })(request);
}

// Wejście z przeglądarki (GET bez Accept: text/event-stream) → instrukcja
// podpięcia. Klienci MCP, którzy próbują GET (stary strumień SSE), dostają
// zgodne ze spec 405 i przechodzą na POST.
function GET(request: Request): Promise<Response> | Response {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/event-stream")) return handler(request);
  return Response.redirect(new URL("/mcp", request.url), 302);
}

export { GET, handler as POST, handler as DELETE };
