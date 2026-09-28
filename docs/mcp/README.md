# MCP w DobrePrinty

DobrePrinty nie ma własnego serwera MCP. Używamy wspólnego konektora drukalo
(`https://drukalo.pl/api/mcp`, kod i OAuth w repo drukalo-poc: `src/lib/mcp`, `src/lib/oauth`,
`convex/oauth.ts`). Jeden wpis w MCP Registry i katalogach — drukalo.

Tu jest tylko warstwa widoczności: landing `/mcp` (SEO/AEO, JSON-LD), pigułka w hero,
teaser na home, FAQ, artykuł `/blog/jak-wydrukowac-grafike-z-chatgpt`, sekcja w `llms.txt`.
Strona `/zamowienie/[slug]` przyjmuje `sides` z linków generowanych przez serwer
(parametr `brand=dobreprinty`).
