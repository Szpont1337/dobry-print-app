"use client";

import { useAction, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { api } from "@convex/_generated/api";
import { ORDER_DRAFT_EVENT, ORDER_DRAFT_KEY } from "@/hooks/use-order-draft";

import type { PixiEngine } from "../engine/pixi-engine";
import { useEditor } from "../store/editor-store";
import type { FormatSpec } from "../types";
import { exportToPdf } from "../utils/export-pdf";

export type ExportPhase = "idle" | "rendering" | "uploading" | "redirecting" | "error";

interface UploadedFileInfo {
  fileKey: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

/**
 * Eksport projektu → PDF → upload do chmury (B2) → dopięcie pliku do szkicu
 * zamówienia → przekierowanie na /zamowienie. Reużywa tej samej ścieżki uploadu
 * co ręczne wgrywanie plików, więc projekt staje się plikiem zamówienia.
 */
export function useExportOrder({
  engine,
  productSlug,
  format,
  formatId,
  quantity,
}: {
  engine: PixiEngine | null;
  productSlug: string;
  format: FormatSpec;
  /** prawdziwe id formatu z katalogu (np. „a5”) — do szkicu zamówienia */
  formatId: string;
  quantity: number;
}) {
  const ed = useEditor();
  const router = useRouter();
  const generateUploadUrl = useAction(api.storage.generateUploadUrl);
  const saveFileMetadata = useMutation(api.files.saveFileMetadata);

  const [phase, setPhase] = useState<ExportPhase>("idle");
  const [error, setError] = useState<string | null>(null);

  const buildPdf = useCallback(async () => {
    if (!engine) throw new Error("Edytor jeszcze się nie wczytał.");
    return exportToPdf(format, productSlug, (pxPerMm) => engine.renderToCanvas(pxPerMm));
  }, [engine, format, productSlug]);

  const download = useCallback(async () => {
    if (ed.doc.nodes.length === 0) {
      setError("Dodaj coś do projektu przed pobraniem.");
      setPhase("error");
      return;
    }
    setError(null);
    setPhase("rendering");
    try {
      const pdf = await buildPdf();
      const blob = new Blob([new Uint8Array(pdf.bytes)], { type: pdf.mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdf.fileName;
      a.click();
      // Zwolnienie URL odraczamy — natychmiastowe revoke potrafi przerwać
      // pobieranie dużego pliku w niektórych przeglądarkach.
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setPhase("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Eksport nie powiódł się.");
      setPhase("error");
    }
  }, [buildPdf, ed.doc.nodes.length]);

  const exportAndOrder = useCallback(async () => {
    if (ed.doc.nodes.length === 0) {
      setError("Dodaj coś do projektu przed zamówieniem.");
      setPhase("error");
      return;
    }
    setError(null);
    setPhase("rendering");
    try {
      const pdf = await buildPdf();

      setPhase("uploading");
      const { uploadUrl, fileKey } = await generateUploadUrl({
        fileName: pdf.fileName,
        fileType: pdf.mimeType,
      });
      const blob = new Blob([new Uint8Array(pdf.bytes)], { type: pdf.mimeType });
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": pdf.mimeType },
        body: blob,
      });
      if (!res.ok) throw new Error(`Upload nie powiódł się (${res.status}).`);

      await saveFileMetadata({
        fileKey,
        fileName: pdf.fileName,
        fileSize: blob.size,
        fileType: pdf.mimeType,
      });

      const design: UploadedFileInfo = {
        fileKey,
        fileName: pdf.fileName,
        fileSize: blob.size,
        fileType: pdf.mimeType,
      };
      writeOrderDraft({ productSlug, formatId, quantity, design });

      setPhase("redirecting");
      router.push(
        `/zamowienie/${productSlug}?qty=${quantity}&format=${encodeURIComponent(formatId)}`,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Nie udało się zapisać projektu.");
      setPhase("error");
    }
  }, [
    buildPdf,
    ed.doc.nodes.length,
    formatId,
    generateUploadUrl,
    productSlug,
    quantity,
    router,
    saveFileMetadata,
  ]);

  return {
    phase,
    error,
    busy: phase === "rendering" || phase === "uploading" || phase === "redirecting",
    exportAndOrder,
    download,
  };
}

function writeOrderDraft({
  productSlug,
  formatId,
  quantity,
  design,
}: {
  productSlug: string;
  formatId: string;
  quantity: number;
  design: UploadedFileInfo;
}): void {
  try {
    const raw = localStorage.getItem(ORDER_DRAFT_KEY);
    const prev = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const prevFiles = Array.isArray(prev.uploadedFiles)
      ? (prev.uploadedFiles as UploadedFileInfo[])
      : [];
    // Zastępujemy poprzedni eksport (prefiks „projekt-”), zachowując inne pliki.
    const kept = prevFiles.filter((f) => !f.fileName.startsWith("projekt-"));
    const next = {
      ...prev,
      config: { slug: productSlug, formatId, quantity },
      uploadedFiles: [...kept, design].slice(0, 10),
    };
    localStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(ORDER_DRAFT_EVENT));
  } catch {
    // brak miejsca / tryb prywatny — pomijamy
  }
}
