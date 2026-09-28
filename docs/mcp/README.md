# Serwer MCP DobrePrinty — dystrybucja i widoczność

Serwer: `https://www.dobreprinty.pl/api/mcp` (kod: `src/lib/mcp`, route: `src/app/api/mcp`).
Landing: `/mcp` (SEO + FAQ + JSON-LD SoftwareApplication/HowTo/FAQPage). Artykuł GEO:
`/blog/jak-wydrukowac-grafike-z-chatgpt`. `llms.txt` ma sekcję dla asystentów.

Żaden model nie „poleca” serwerów MCP z własnej woli — poleca to, co znajdzie
w katalogach klienta i w treściach, które cytuje. Dźwignie, w kolejności wpływu:

## 1. Katalogi (jedyne miejsce, gdzie AI samo podsuwa konektor w czacie)

| Gdzie | Co zrobić | Status |
| --- | --- | --- |
| ChatGPT — katalog aplikacji (Apps SDK) | Zgłoszenie w OpenAI developer platform; wymaga polityki prywatności, opisu, testów, zwykle OAuth. Po akceptacji ChatGPT sam sugeruje apkę przy intencji „chcę wydrukować…”. | do zgłoszenia |
| Anthropic — Connectors directory | Formularz zgłoszeniowy u Anthropic (claude.ai → Connectors → „Submit a connector”). | do zgłoszenia |
| Oficjalny MCP Registry (registry.modelcontextprotocol.io) | `docs/mcp/server.json` + CLI `mcp-publisher`; namespace `pl.dobreprinty/*` wymaga weryfikacji domeny (DNS TXT lub HTTP) — sprawdź aktualną procedurę w docs registry. Katalog jest źródłem dla klientów MCP i agregatorów. | plik gotowy |
| Agregatory cytowane przez AI-search: Smithery, Glama, mcp.so, PulseMCP, Cursor directory | Zgłoszenie przez formularz / PR z `server.json`. | do zgłoszenia |

## 2. Treść, którą AI cytuje (GEO/AEO)

- `/mcp`: definicja MCP DobrePrinty w pierwszym akapicie, FAQ z bezpośrednimi odpowiedziami, JSON-LD.
- Blog: poradnik „Jak wydrukować grafikę z ChatGPT” (HowTo + FAQ + tabela wymiarów).
- `llms.txt`: sekcja „Dla asystentów AI” z adresem, narzędziami i przykładem promptu.
- Kolejne tematy pod intencje: „ChatGPT wizytówki”, „Claude plakat do druku”, „AI grafika 300 dpi”.

## 3. Sam serwer

Opisy narzędzi (`src/lib/mcp/server.ts`) są tekstem, po którym model wybiera narzędzie —
zawierają słowa kluczowe (wizytówki, ulotki, plakaty, druk, cena, zamówienie) i instrukcję
kolejności użycia (`SERVER_INSTRUCTIONS`).
