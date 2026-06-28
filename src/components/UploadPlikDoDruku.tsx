"use client";

import { useAction, useMutation } from "convex/react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Plus,
  UploadCloud,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { api } from "@convex/_generated/api";

import { Button } from "@/components/ui";

const ACCEPTED_EXTENSIONS = [
  // Print-ready / vector
  ".pdf",
  ".ai",
  ".eps",
  ".ps",
  ".svg",
  ".cdr",
  // Raster / common image formats
  ".png",
  ".jpg",
  ".jpeg",
  ".tif",
  ".tiff",
  ".bmp",
  ".gif",
  ".webp",
  ".heic",
  ".heif",
  ".psd",
] as const;
const ACCEPT_ATTR = `${ACCEPTED_EXTENSIONS.join(",")},image/*`;
const MAX_SIZE_BYTES = 500 * 1024 * 1024;
const MAX_FILES = 10;

type ItemStage = "uploading" | "success" | "error";

type UploadItem = {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  stage: ItemStage;
  progress: number;
  error?: string;
  fileKey?: string;
};

function formatMB(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// Skraca długą nazwę pliku do "ABCDE….ext", zachowując rozszerzenie.
// Zapobiega rozjeżdżaniu się szerokości / poziomemu scrollowi na mobile.
function shortenFileName(name: string, head = 5): string {
  const dot = name.lastIndexOf(".");
  const hasExt = dot > 0 && dot < name.length - 1;
  const base = hasExt ? name.slice(0, dot) : name;
  const ext = hasExt ? name.slice(dot) : "";
  if (base.length <= head) return name;
  return `${base.slice(0, head)}…${ext}`;
}

function isAcceptedFile(file: File): boolean {
  // Any image MIME type is fine — covers formats we may not list by extension
  // (e.g. .avif, .jfif) and prevents users bailing on png/jpg uploads.
  if (file.type.startsWith("image/")) return true;
  const lower = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function uploadViaXhr(
  url: string,
  file: File,
  onProgress: (percent: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    if (file.type) xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`B2 odpowiedziało ${xhr.status}`));
    });
    xhr.addEventListener("error", () =>
      reject(new Error("Błąd sieci podczas uploadu.")),
    );
    xhr.addEventListener("abort", () => reject(new Error("Upload przerwany.")));
    xhr.send(file);
  });
}

export type UploadedFileInfo = {
  fileKey: string;
  fileName: string;
  fileSize: number;
  fileType: string;
};

type Props = {
  onChange?: (files: UploadedFileInfo[]) => void;
  onUploadingChange?: (uploading: boolean) => void;
  /** Pliki przywrócone z zapisanego szkicu zamówienia (już wgrane do chmury). */
  initialFiles?: UploadedFileInfo[];
};

export default function UploadPlikDoDruku({
  onChange,
  onUploadingChange,
  initialFiles,
}: Props = {}) {
  const generateUploadUrl = useAction(api.storage.generateUploadUrl);
  const saveFileMetadata = useMutation(api.files.saveFileMetadata);

  const [items, setItems] = useState<UploadItem[]>(() =>
    (initialFiles ?? []).map((f, i) => ({
      id: `restored-${i}-${f.fileKey}`,
      fileName: f.fileName,
      fileSize: f.fileSize,
      fileType: f.fileType,
      stage: "success" as const,
      progress: 100,
      fileKey: f.fileKey,
    })),
  );
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const queueRef = useRef<{ id: string; file: File }[]>([]);
  const runningRef = useRef(false);

  // Najświeższe callbacki trzymamy w refach, by efekty-notyfikatory nie zależały
  // od ich tożsamości. Rodzic zwykle przekazuje inline onChange (nowa funkcja co
  // render) i robi w nim setState — zależność od tożsamości zapętlałaby render.
  const onChangeRef = useRef(onChange);
  const onUploadingChangeRef = useRef(onUploadingChange);
  useEffect(() => {
    onChangeRef.current = onChange;
    onUploadingChangeRef.current = onUploadingChange;
  });

  // Powiadom rodzica o liście wgranych plików — tylko gdy faktycznie się zmieni
  // (sygnatura), inaczej tożsamość nowej tablicy zapętlałaby setState rodzica.
  const lastFilesSigRef = useRef<string | null>(null);
  useEffect(() => {
    const uploaded: UploadedFileInfo[] = items
      .filter((it) => it.stage === "success" && it.fileKey)
      .map((it) => ({
        fileKey: it.fileKey as string,
        fileName: it.fileName,
        fileSize: it.fileSize,
        fileType: it.fileType,
      }));
    const sig = JSON.stringify(uploaded);
    if (sig === lastFilesSigRef.current) return;
    lastFilesSigRef.current = sig;
    onChangeRef.current?.(uploaded);
  }, [items]);

  const lastUploadingRef = useRef<boolean | null>(null);
  useEffect(() => {
    const uploading = items.some((it) => it.stage === "uploading");
    if (uploading === lastUploadingRef.current) return;
    lastUploadingRef.current = uploading;
    onUploadingChangeRef.current?.(uploading);
  }, [items]);

  const updateItem = useCallback(
    (id: string, patch: Partial<UploadItem>) => {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, ...patch } : it)),
      );
    },
    [],
  );

  const processQueue = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    try {
      while (queueRef.current.length > 0) {
        const next = queueRef.current.shift();
        if (!next) break;
        const { id, file } = next;
        try {
          const { uploadUrl, fileKey } = await generateUploadUrl({
            fileName: file.name,
            fileType: file.type || "application/octet-stream",
          });
          await uploadViaXhr(uploadUrl, file, (percent) =>
            updateItem(id, { progress: percent }),
          );
          await saveFileMetadata({
            fileKey,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type || "application/octet-stream",
          });
          updateItem(id, {
            stage: "success",
            progress: 100,
            fileKey,
          });
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : "Nie udało się wysłać pliku.";
          updateItem(id, { stage: "error", error: message });
        }
      }
    } finally {
      runningRef.current = false;
    }
  }, [generateUploadUrl, saveFileMetadata, updateItem]);

  const enqueueFiles = useCallback(
    (files: File[]) => {
      const currentCount = items.length;
      const room = MAX_FILES - currentCount;
      if (room <= 0) return;
      const accepted = files.slice(0, room);

      const newItems: UploadItem[] = [];
      const toQueue: { id: string; file: File }[] = [];

      for (const file of accepted) {
        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        if (!isAcceptedFile(file)) {
          newItems.push({
            id,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            stage: "error",
            progress: 0,
            error:
              "Niewspierany format. Akceptujemy pliki graficzne (PDF, JPG, PNG, AI, EPS, TIFF i inne).",
          });
          continue;
        }
        if (file.size > MAX_SIZE_BYTES) {
          newItems.push({
            id,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            stage: "error",
            progress: 0,
            error: `Plik ma ${formatMB(file.size)}. Maksymalny rozmiar to 500 MB.`,
          });
          continue;
        }
        if (file.size === 0) {
          newItems.push({
            id,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            stage: "error",
            progress: 0,
            error: "Plik jest pusty.",
          });
          continue;
        }

        newItems.push({
          id,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type || "application/octet-stream",
          stage: "uploading",
          progress: 0,
        });
        toQueue.push({ id, file });
      }

      if (newItems.length === 0) return;
      setItems((prev) => [...prev, ...newItems]);
      queueRef.current.push(...toQueue);
      void processQueue();
    },
    [items.length, processQueue],
  );

  const onPickClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const list = event.target.files;
      const files = list ? Array.from(list) : [];
      event.target.value = "";
      if (files.length > 0) enqueueFiles(files);
    },
    [enqueueFiles],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragActive(false);
      const files = event.dataTransfer.files
        ? Array.from(event.dataTransfer.files)
        : [];
      if (files.length > 0) enqueueFiles(files);
    },
    [enqueueFiles],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    queueRef.current = queueRef.current.filter((q) => q.id !== id);
  }, []);

  const isEmpty = items.length === 0;
  const atLimit = items.length >= MAX_FILES;
  const successCount = items.filter((it) => it.stage === "success").length;

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        multiple
        onChange={onInputChange}
        className="sr-only"
        aria-hidden
      />

      {isEmpty ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Wgraj pliki do druku"
          onClick={onPickClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onPickClick();
            }
          }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`group relative flex w-full cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed px-6 py-12 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50 hover:bg-muted/40"
          }`}
        >
          <span className="grid size-16 place-items-center rounded-lg bg-accent text-primary">
            <UploadCloud aria-hidden className="size-8" strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-lg font-semibold text-foreground">
              Przeciągnij plik z projektem lub kliknij, żeby wybrać
              <span className="ml-1 text-primary">*</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Wymagany przynajmniej jeden plik. Akceptujemy{" "}
              {ACCEPTED_EXTENSIONS.join(", ")} · maks. 500 MB · do {MAX_FILES}{" "}
              plików
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Możesz wgrać kilka projektów naraz. Każdy plik trafia bezpośrednio
            do magazynu w chmurze.
          </p>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`border-2 border-dashed p-4 transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-card"
          }`}
        >
          <ul className="flex flex-col gap-3">
            {items.map((it) => (
              <li
                key={it.id}
                className={`flex items-start gap-3 border bg-card p-3 ${
                  it.stage === "error"
                    ? "border-destructive/40"
                    : it.stage === "success"
                      ? "border-primary/40"
                      : "border-border"
                }`}
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-lg ${
                    it.stage === "success"
                      ? "bg-primary text-primary-foreground"
                      : it.stage === "error"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-accent text-primary"
                  }`}
                  aria-hidden
                >
                  {it.stage === "uploading" && (
                    <Loader2 className="size-5 animate-spin" strokeWidth={1.8} />
                  )}
                  {it.stage === "success" && (
                    <CheckCircle2 className="size-5" strokeWidth={1.8} />
                  )}
                  {it.stage === "error" && (
                    <AlertCircle className="size-5" strokeWidth={1.8} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <FileText
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                    <p
                      className="min-w-0 flex-1 truncate text-sm font-medium text-foreground"
                      title={it.fileName}
                    >
                      {shortenFileName(it.fileName)}
                    </p>
                    <span className="ml-auto whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {formatMB(it.fileSize)}
                    </span>
                  </div>
                  {it.stage === "uploading" && (
                    <div className="mt-2">
                      <div
                        className="h-1.5 w-full overflow-hidden rounded-lg bg-muted"
                        role="progressbar"
                        aria-valuenow={it.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Postęp wysyłania ${it.fileName}`}
                      >
                        <div
                          className="h-full rounded-lg bg-primary transition-[width] duration-200"
                          style={{ width: `${it.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 font-mono text-xs font-medium text-foreground tabular-nums">
                        {it.progress}%
                      </p>
                    </div>
                  )}
                  {it.stage === "success" && (
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Wgrany · zweryfikowano
                    </p>
                  )}
                  {it.stage === "error" && (
                    <p className="mt-1 text-xs text-destructive">
                      {it.error ?? "Spróbuj ponownie."}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={`Usuń ${it.fileName}`}
                >
                  <X aria-hidden className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {successCount} z {items.length}{" "}
              {items.length === 1 ? "plik wgrany" : "plików wgranych"} ·
              limit {MAX_FILES}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPickClick}
              disabled={atLimit}
            >
              <Plus aria-hidden className="size-4" />
              {atLimit ? "Osiągnięto limit" : "Dodaj kolejny plik"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
