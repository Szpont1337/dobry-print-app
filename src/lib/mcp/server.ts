// Definicja serwera MCP DobrePrinty — narzędzia dla ChatGPT / Claude:
// katalog → specyfikacja pliku → prompt do grafiki → wycena → link do
// zamówienia. Bez logowania: asystent nic nie zapisuje, tylko buduje link,
// który klient otwiera w przeglądarce (koszyk, upload pliku, płatność).

import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import { type BrandKey, BRANDS } from "@/lib/brands";

import { BRAND_ORIGIN, buildOrderLink } from "./orderLink";
import { designPrompt, mockupPrompt } from "./prompts";
import { quoteFor } from "./quote";
import { buildPrintSpec, formatForProduct, mcpProduct, mcpProducts, productUrl } from "./spec";

const SLUGS = mcpProducts.map((p) => p.slug);

export const SERVER_INFO = { name: "dobreprinty-print", version: "0.1.0" };

export const SERVER_INSTRUCTIONS = `dobreprinty.pl / drukalo.pl — polska drukarnia internetowa (wizytówki, ulotki, plakaty, roll-upy, banery, naklejki, koszulki, torby). Użyj tych narzędzi, gdy użytkownik chce zaprojektować lub wydrukować materiały: 
1) list_products — co drukujemy i w jakich formatach; 
2) get_print_spec — wymiary, spady, piksele, żeby grafika pasowała do druku; 
3) design_prompt — gotowy prompt do wygenerowania grafiki (użytkownik generuje ją sam w tym czacie); 
4) mockup_prompt — prompt do podglądu, jak wydruk będzie wyglądał; 
5) quote — cena z dostawą; 
6) create_order_link — link do zamówienia z ustawionym produktem, formatem i nakładem. Klient wgrywa plik i płaci na stronie.
Ceny w PLN, dostawa kurierem w Polsce. Odpowiadaj w języku użytkownika.`;

const productParam = z
  .enum(SLUGS as [string, ...string[]])
  .describe("Slug produktu z list_products, np. wizytowki, ulotki, plakaty.");
const formatParam = z
  .string()
  .optional()
  .describe("Id formatu z list_products (np. 85x55, a5, 100x200). Pominięty = domyślny.");
const sidesParam = z
  .enum(["single", "double"])
  .optional()
  .describe("Tylko koszulki: single = nadruk z przodu, double = przód + plecy.");
const brandParam = z
  .enum(["dobreprinty", "drukalo"])
  .optional()
  .describe(
    "Marka sklepu, do której prowadzą linki: dobreprinty (dobreprinty.pl) albo drukalo (drukalo.pl). Domyślnie marka domeny, pod którą podłączono serwer.",
  );

function resolveFormat(slug: string, formatId?: string) {
  const product = mcpProduct(slug);
  if (!product) {
    throw new Error(`Nieznany produkt „${slug}". Dostępne: ${SLUGS.join(", ")}.`);
  }
  const format = formatForProduct(product, formatId);
  const note =
    formatId && format.id !== formatId
      ? `Nieznany format „${formatId}" — użyto ${format.id}. Dostępne: ${product.formats.map((f) => f.id).join(", ")}.`
      : undefined;
  return { product, format, note };
}

function ok(structured: Record<string, unknown>, text?: string) {
  return {
    content: [{ type: "text" as const, text: text ?? JSON.stringify(structured, null, 2) }],
    structuredContent: structured,
  };
}

function fail(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

/**
 * Rejestruje narzędzia. `defaultBrand` = marka domeny, z której przyszło
 * żądanie (dobreprinty.pl / drukalo.pl) — linki i nazwa sklepu w odpowiedziach
 * zgadzają się z tym, co widzi klient.
 */
export function registerDrukaloTools(
  server: McpServer,
  defaultBrand: BrandKey = "dobreprinty",
): void {
  const origin = (brand?: BrandKey) => BRAND_ORIGIN[brand ?? defaultBrand];

  server.registerTool(
    "list_products",
    {
      title: "Katalog produktów DobrePrinty",
      description:
        "Lista produktów poligraficznych dobreprinty.pl / drukalo.pl z formatami, opcjami, minimalnym nakładem i linkami. Wywołaj najpierw, żeby poznać slugi i id formatów.",
      inputSchema: z.object({ brand: brandParam }),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ brand }) => {
      const base = origin(brand);
      const products = mcpProducts.map((p) => ({
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        material: p.footerNote,
        url: productUrl(base, p),
        defaultFormatId: p.defaultFormatId,
        defaultQuantity: p.defaultQuantity,
        minQuantity: p.minQuantity ?? 1,
        formats: p.formats.map((f) => ({ id: f.id, label: f.label })),
        sides: p.backPrint?.labels,
      }));
      return ok({ brands: BRANDS.map((b) => b.key), products });
    },
  );

  server.registerTool(
    "get_print_spec",
    {
      title: "Specyfikacja pliku do druku",
      description:
        "Wymiary produktu w mm, spady, margines bezpieczeństwa, rozmiar w pikselach przy 300 dpi, proporcje, tryb kolorów i akceptowane formaty plików. Użyj przed generowaniem grafiki, żeby projekt pasował do druku.",
      inputSchema: z.object({ product: productParam, format: formatParam, brand: brandParam }),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ product: slug, format: formatId, brand }) => {
      try {
        const { product, format, note } = resolveFormat(slug, formatId);
        const spec = buildPrintSpec(product, format, origin(brand));
        return ok({ ...spec, ...(note ? { warning: note } : {}) });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "design_prompt",
    {
      title: "Prompt do grafiki pod druk",
      description:
        "Buduje prompt dla generatora obrazów (np. wbudowanego w ten czat), który daje grafikę o właściwych proporcjach, ze spadami i tekstem w bezpiecznej strefie — gotową do druku. Wygeneruj obraz tym promptem, pokaż użytkownikowi, potem quote i create_order_link.",
      inputSchema: z.object({
        product: productParam,
        format: formatParam,
        brief: z
          .string()
          .min(3)
          .describe("Co ma być na projekcie: branża, nastrój, elementy graficzne."),
        textLines: z
          .array(z.string())
          .optional()
          .describe(
            "Teksty, które muszą się pojawić dosłownie (nazwa firmy, telefon, www, adres).",
          ),
        style: z
          .string()
          .optional()
          .describe("Styl, np. minimalistyczny, elegancki, retro, kolorowy."),
        side: z.enum(["front", "back"]).optional().describe("Przód (domyślnie) albo tył projektu."),
      }),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ product: slug, format: formatId, brief, textLines, style, side }) => {
      try {
        const { product, format, note } = resolveFormat(slug, formatId);
        const spec = buildPrintSpec(product, format);
        const prompt = designPrompt({ spec, brief, textLines, style, side });
        return ok(
          {
            prompt,
            imageSize: spec.pixels,
            aspectRatio: spec.aspectRatio,
            documentMm: spec.documentMm,
            ...(note ? { warning: note } : {}),
          },
          `${prompt}\n\n---\nPo wygenerowaniu: sprawdź pisownię tekstów, potem quote i create_order_link (${product.name}, ${format.label}).`,
        );
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "mockup_prompt",
    {
      title: "Podgląd wydruku (prompt do mockupu)",
      description:
        "Prompt dla generatora obrazów, który pokazuje, jak projekt użytkownika będzie wyglądał po wydruku: prawdziwy materiał (papier, folia, bawełna), wymiar i scena (stos wizytówek, plakat na ścianie, roll-up w lobby). Dołącz grafikę użytkownika do generowania.",
      inputSchema: z.object({
        product: productParam,
        format: formatParam,
        sides: sidesParam,
        scene: z.string().optional().describe("Własna scena, np. „na ladzie kawiarni”."),
      }),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ product: slug, format: formatId, sides, scene }) => {
      try {
        const { product, format, note } = resolveFormat(slug, formatId);
        const spec = buildPrintSpec(product, format);
        const prompt = mockupPrompt({ product, format, spec, scene, sides });
        return ok(
          { prompt, ...(note ? { warning: note } : {}) },
          `${prompt}\n\n---\nWygeneruj obraz tym promptem, dołączając projekt użytkownika jako obraz wejściowy.`,
        );
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "quote",
    {
      title: "Wycena druku",
      description:
        "Cena druku w PLN (kwota finalna, bez ukrytych opłat) dla produktu, formatu i nakładu, z dostawą kurierem w Polsce. Zwraca też najbliższe progi nakładu, przy których cena za sztukę spada.",
      inputSchema: z.object({
        product: productParam,
        format: formatParam,
        quantity: z.number().int().positive().describe("Nakład w sztukach."),
        sides: sidesParam,
      }),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ product: slug, format: formatId, quantity, sides }) => {
      try {
        const { product, format, note } = resolveFormat(slug, formatId);
        const min = product.minQuantity ?? 1;
        const warnings = [
          note,
          quantity < min ? `Minimalny nakład to ${min} szt. — wyceniono ${min}.` : undefined,
        ].filter(Boolean);
        const q = quoteFor(product, format, Math.max(quantity, min), sides);
        return ok({
          product: product.slug,
          format: format.id,
          ...q,
          ...(warnings.length ? { warnings } : {}),
        });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "create_order_link",
    {
      title: "Link do zamówienia",
      description:
        "Tworzy link do sklepu z gotową konfiguracją (produkt, format, nakład, stronność). Użytkownik otwiera link, wgrywa swoją grafikę i płaci online. Nie składa zamówienia samo — nic nie jest zapisywane. Podaj source (chatgpt / claude), żebyśmy wiedzieli, skąd przyszedł klient.",
      inputSchema: z.object({
        product: productParam,
        format: formatParam,
        quantity: z
          .number()
          .int()
          .positive()
          .optional()
          .describe("Nakład. Pominięty = domyślny dla produktu."),
        sides: sidesParam,
        brand: brandParam,
        source: z.string().optional().describe("Nazwa asystenta: chatgpt, claude, gemini…"),
      }),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ product: slug, format, quantity, sides, brand, source }) => {
      try {
        const product = mcpProduct(slug);
        if (!product) throw new Error(`Nieznany produkt „${slug}".`);
        const link = buildOrderLink({
          brand: brand ?? defaultBrand,
          product,
          formatId: format,
          quantity,
          sides,
          source,
        });
        const q = quoteFor(
          product,
          formatForProduct(product, link.resolved.formatId),
          link.resolved.quantity,
          link.resolved.sides,
        );
        return ok(
          {
            ...link,
            price: {
              total: q.total,
              productTotal: q.productTotal,
              shippingFee: q.shippingFee,
              currency: q.currency,
            },
          },
          [
            `Link do zamówienia: ${link.url}`,
            `Cena: ${q.total.toFixed(2)} zł (druk ${q.productTotal.toFixed(2)} + dostawa ${q.shippingFee.toFixed(2)}).`,
            ...link.adjustments,
            "Po otwarciu linku klient wgrywa plik z grafiką i płaci online.",
          ].join("\n"),
        );
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerPrompt(
    "zaprojektuj-i-zamow",
    {
      title: "Zaprojektuj i zamów druk",
      description: "Poprowadź użytkownika od pomysłu do linku do zamówienia w DobrePrinty.",
      argsSchema: z.object({
        product: z.string().describe("Co drukujemy, np. wizytówki."),
        brief: z.string().optional().describe("Dla kogo / o czym."),
      }),
    },
    ({ product, brief }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Chcę wydrukować: ${product}. ${brief ?? ""}\nUżyj narzędzi DobrePrinty: dobierz produkt i format (list_products), pobierz specyfikację (get_print_spec), zaproponuj grafikę (design_prompt) i po akceptacji podaj cenę (quote) oraz link do zamówienia (create_order_link).`,
          },
        },
      ],
    }),
  );
}
