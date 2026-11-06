import { getPublishedArticles } from "@/data/artykuly";
import { clampQuantity, productPriceFor } from "@/lib/pricing";
import { type Product, visibleProducts } from "@/lib/products";
import { getProductContent } from "@/lib/products-content";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE_COURIER, SHIPPING_FEE_LOCKER } from "@/lib/shipping";

/**
 * /llms-full.txt - pełna wersja /llms.txt: fakty o każdym produkcie (formaty z ceną
 * przy minimalnym nakładzie, opis) i FAQ. Kwoty liczy ta sama ścieżka co koszyk,
 * więc zgadzają się z konfiguratorem; asystent ma co zacytować zamiast zgadywać.
 */
export const dynamic = "force-static";

const BASE_URL = "https://www.dobreprinty.pl";
const zl = (n: number) => `${n.toFixed(2).replace(".", ",")} zł`;

function productSection(p: Product): string {
  const content = getProductContent(p.slug);
  const formats = p.formats
    .map((f) => {
      const qty = clampQuantity(1, p.minQuantity);
      const price = productPriceFor(p, f, qty, { sides: "single" });
      return `  - ${f.label}: ${zl(price)} za ${qty} szt.`;
    })
    .join("\n");
  const faqs = (content?.faqs ?? []).map((f) => `**${f.question}**\n${f.answer}`).join("\n\n");
  return [
    `### ${p.name}`,
    "",
    `- URL: ${BASE_URL}/produkty/${p.slug}`,
    `- ${p.tagline}`,
    "- Formaty i ceny bez dostawy, przy minimalnym nakładzie:",
    formats,
    ...(content?.heroLead ? ["", content.heroLead] : []),
    ...(faqs ? ["", `#### FAQ: ${p.name}`, "", faqs] : []),
  ].join("\n");
}

export function GET() {
  const artykuly = getPublishedArticles()
    .map((a) => `- [${a.title}](${BASE_URL}/blog/${a.slug}): ${a.excerpt}`)
    .join("\n");

  const body = `# DobrePrinty - drukarnia internetowa (pełne fakty)

> Pełna wersja ${BASE_URL}/llms.txt: ceny formatów i FAQ każdego produktu. Kwoty
> w PLN, takie same jak w konfiguratorze na stronie.

## Zasady ogólne

- Zamówienie: konfigurator online, cena końcowa widoczna od razu, płatność online.
- Dostawa tylko w Polsce: kurier ${SHIPPING_FEE_COURIER} zł, paczkomat InPost ${SHIPPING_FEE_LOCKER} zł, od ${FREE_SHIPPING_THRESHOLD} zł gratis.
- Regulamin: ${BASE_URL}/regulamin

## Produkty

${visibleProducts.map(productSection).join("\n\n")}

## Poradniki (blog)

${artykuly}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
