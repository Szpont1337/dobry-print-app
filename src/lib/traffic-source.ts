// Klasyfikacja źródła ruchu na podstawie domeny odsyłającej (referrer) i UTM.
// Czysta funkcja bez zależności — reużywana po stronie klienta (atrybucja
// zamówienia w localStorage) ORAZ w Convex (klasyfikacja domen z PostHog).
//
// Kluczowy cel biznesowy: odróżnić ruch z AI/LLM (ChatGPT, Perplexity, Gemini…)
// od klasycznego SEO organic (Google/Bing) i pozostałych kanałów.

export type TrafficChannel =
  | "ai_llm"
  | "organic"
  | "paid"
  | "social"
  | "referral"
  | "direct";

export interface ChannelMeta {
  channel: TrafficChannel;
  // Ludzka etykieta kanału (do embeda Discord / panelu).
  label: string;
  emoji: string;
}

// Kolejność = kolejność wyświetlania w raporcie.
export const CHANNEL_META: Record<TrafficChannel, ChannelMeta> = {
  ai_llm: { channel: "ai_llm", label: "AI / LLM", emoji: "🤖" },
  organic: { channel: "organic", label: "Organic (SEO)", emoji: "🔍" },
  paid: { channel: "paid", label: "Płatne", emoji: "💸" },
  social: { channel: "social", label: "Social", emoji: "📣" },
  referral: { channel: "referral", label: "Odesłania", emoji: "🔗" },
  direct: { channel: "direct", label: "Bezpośrednie", emoji: "↗️" },
};

export const CHANNEL_ORDER: TrafficChannel[] = [
  "ai_llm",
  "organic",
  "paid",
  "social",
  "referral",
  "direct",
];

// Fragmenty domen / utm_source wskazujące na asystentów AI. Dopasowanie
// podłańcuchem, więc łapie też subdomeny (np. "www.perplexity.ai").
const AI_LLM_HINTS = [
  "chatgpt.com",
  "chat.openai.com",
  "openai.com",
  "perplexity.ai",
  "gemini.google.com",
  "bard.google.com",
  "copilot.microsoft.com",
  "claude.ai",
  "anthropic.com",
  "poe.com",
  "you.com",
  "phind.com",
  "mistral.ai",
  "deepseek.com",
  "grok.com",
  "x.ai",
];

// utm_source (znormalizowany) świadczący o AI, gdy referrer jest pusty
// (część asystentów nie przekazuje referrera, ale można otagować linki).
const AI_LLM_UTM = [
  "chatgpt",
  "openai",
  "perplexity",
  "gemini",
  "bard",
  "copilot",
  "claude",
  "llm",
  "ai",
];

const SEARCH_HINTS = [
  "google.",
  "bing.com",
  "duckduckgo.com",
  "yahoo.",
  "ecosia.org",
  "yandex.",
  "baidu.com",
  "search.brave.com",
  "startpage.com",
];

const SOCIAL_HINTS = [
  "facebook.com",
  "fb.com",
  "instagram.com",
  "l.instagram.com",
  "t.co",
  "twitter.com",
  "tiktok.com",
  "linkedin.com",
  "lnkd.in",
  "youtube.com",
  "youtu.be",
  "reddit.com",
  "pinterest.",
];

const PAID_MEDIUMS = ["cpc", "ppc", "paid", "paidsearch", "display", "cpm"];

function contains(haystack: string, needles: string[]): boolean {
  return needles.some((n) => haystack.includes(n));
}

export interface ClassifyInput {
  // Domena odsyłająca, np. "www.google.com" (bez protokołu). Pusta = brak referrera.
  referrerDomain?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
}

/**
 * Zwraca kanał ruchu + ładną nazwę źródła.
 * `sourceName` to konkretny dostawca (np. "ChatGPT", "Google") gdy dało się
 * rozpoznać, w przeciwnym razie sama domena lub etykieta kanału.
 */
export function classifyTrafficSource(input: ClassifyInput): {
  channel: TrafficChannel;
  sourceName: string;
} {
  const dom = (input.referrerDomain ?? "").trim().toLowerCase();
  const utmSource = (input.utmSource ?? "").trim().toLowerCase();
  const utmMedium = (input.utmMedium ?? "").trim().toLowerCase();

  // 1) AI / LLM — najwyższy priorytet (chcemy to wyłapać ponad wszystko).
  if (contains(dom, AI_LLM_HINTS) || (!!utmSource && contains(utmSource, AI_LLM_UTM))) {
    return { channel: "ai_llm", sourceName: prettySource(dom, utmSource) };
  }

  // 2) Płatne — po utm_medium (niezależnie od domeny wyszukiwarki).
  if (utmMedium && PAID_MEDIUMS.includes(utmMedium)) {
    return { channel: "paid", sourceName: prettySource(dom, utmSource) };
  }

  // 3) Organic (SEO) — wyszukiwarki, bez oznaczenia płatnego.
  if (contains(dom, SEARCH_HINTS)) {
    return { channel: "organic", sourceName: prettySource(dom, utmSource) };
  }

  // 4) Social.
  if (contains(dom, SOCIAL_HINTS) || (utmMedium && utmMedium.includes("social"))) {
    return { channel: "social", sourceName: prettySource(dom, utmSource) };
  }

  // 5) Bezpośrednie — brak referrera i brak utm.
  if (!dom && !utmSource) {
    return { channel: "direct", sourceName: "Bezpośrednie" };
  }

  // 6) Reszta — odesłania z innych stron.
  return { channel: "referral", sourceName: prettySource(dom, utmSource) };
}

// Mapuje znane domeny/utm na ładną nazwę dostawcy.
function prettySource(dom: string, utmSource: string): string {
  const key = dom || utmSource;
  if (!key) return "—";
  if (key.includes("chatgpt") || key.includes("openai")) return "ChatGPT";
  if (key.includes("perplexity")) return "Perplexity";
  if (key.includes("gemini") || key.includes("bard")) return "Gemini";
  if (key.includes("copilot")) return "Copilot";
  if (key.includes("claude") || key.includes("anthropic")) return "Claude";
  if (key.includes("deepseek")) return "DeepSeek";
  if (key.includes("grok") || key === "x.ai") return "Grok";
  if (key.includes("google")) return "Google";
  if (key.includes("bing")) return "Bing";
  if (key.includes("duckduckgo")) return "DuckDuckGo";
  if (key.includes("facebook") || key.includes("fb.com")) return "Facebook";
  if (key.includes("instagram")) return "Instagram";
  if (key.includes("tiktok")) return "TikTok";
  if (key.includes("linkedin") || key.includes("lnkd.in")) return "LinkedIn";
  if (key.includes("youtube") || key.includes("youtu.be")) return "YouTube";
  if (key === "t.co" || key.includes("twitter")) return "X (Twitter)";
  // Domyślnie: sama domena bez "www.".
  return (dom || utmSource).replace(/^www\./, "");
}

// Wyciąga hostname z surowego referrera/URL-a. Zwraca "" gdy się nie da.
export function referrerHostname(raw: string | null | undefined): string {
  if (!raw) return "";
  try {
    return new URL(raw).hostname.toLowerCase();
  } catch {
    return "";
  }
}
