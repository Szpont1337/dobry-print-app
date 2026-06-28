// Budowa dokumentu startowego i autosave do localStorage (per produkt+format).
// Format zawsze pochodzi z URL — przywracamy z pamięci tylko treść (tło + węzły),
// żeby zmiana formatu nie wczytała projektu o złym wymiarze.

import { AUTOSAVE_PREFIX } from "../constant/editor";
import type { EditorDoc, FormatSpec, SceneNode } from "../types";

export function blankDoc(format: FormatSpec): EditorDoc {
  return {
    format,
    background: { color: "#ffffff", enabled: true },
    nodes: [],
  };
}

export function autosaveKey(slug: string, formatId: string): string {
  return `${AUTOSAVE_PREFIX}${slug}:${formatId}`;
}

export function saveAutosave(key: string, doc: EditorDoc): void {
  try {
    const payload = JSON.stringify({
      background: doc.background,
      nodes: doc.nodes,
    });
    localStorage.setItem(key, payload);
  } catch {
    // brak miejsca / tryb prywatny — pomijamy
  }
}

export function clearAutosave(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function loadDoc(format: FormatSpec, key: string): EditorDoc {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return blankDoc(format);
    const parsed = JSON.parse(raw) as {
      background?: EditorDoc["background"];
      nodes?: unknown;
    };
    const nodes = Array.isArray(parsed.nodes)
      ? (parsed.nodes.filter(isSceneNode) as SceneNode[])
      : [];
    return {
      format,
      background:
        parsed.background && typeof parsed.background.color === "string"
          ? parsed.background
          : { color: "#ffffff", enabled: true },
      nodes,
    };
  } catch {
    return blankDoc(format);
  }
}

function isSceneNode(value: unknown): value is SceneNode {
  if (!value || typeof value !== "object") return false;
  const n = value as Record<string, unknown>;
  return (
    typeof n.id === "string" &&
    typeof n.kind === "string" &&
    typeof n.cx === "number" &&
    typeof n.cy === "number" &&
    typeof n.w === "number" &&
    typeof n.h === "number"
  );
}
