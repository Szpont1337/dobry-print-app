"use client";

import { useEffect } from "react";

import { AUTOSAVE_DEBOUNCE_MS } from "../constant/editor";
import { useEditor } from "../store/editor-store";
import { autosaveKey, saveAutosave } from "../utils/doc";

/** Zapisuje treść projektu do localStorage z debouncem przy każdej zmianie. */
export function useAutosave(slug: string, formatId: string): void {
  const { doc } = useEditor();
  useEffect(() => {
    const key = autosaveKey(slug, formatId);
    const t = setTimeout(() => saveAutosave(key, doc), AUTOSAVE_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [doc, slug, formatId]);
}
