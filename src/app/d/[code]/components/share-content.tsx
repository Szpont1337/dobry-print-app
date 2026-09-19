"use client";

import { useTranslation } from "react-i18next";

import { buttonVariants, Card, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/utils";

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

export function ShareContent({
  code,
  data,
}: {
  code: string;
  data: {
    orderShortId: string;
    productName: string;
    formatLabel: string | null | undefined;
    quantity: number;
    notes: string | null | undefined;
    fileUrl: string | null | undefined;
    files: { fileName: string; fileSize: number }[];
  };
}) {
  const { t } = useTranslation("pages");
  const totalBytes = data.files.reduce((sum, f) => sum + f.fileSize, 0);
  const hasFiles = data.files.length > 0;

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-13 sm:px-8 sm:py-21">
      <Card className="p-5 sm:p-8">
        <Eyebrow className="font-mono">{t("download.eyebrow")}</Eyebrow>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
          {t("download.orderLabel", { id: data.orderShortId })}
        </h1>

        <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {t("download.product")}
            </dt>
            <dd className="font-semibold text-foreground">{data.productName}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {t("download.format")}
            </dt>
            <dd className="font-semibold text-foreground">{data.formatLabel}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {t("download.quantity")}
            </dt>
            <dd className="font-semibold text-foreground">
              {t("download.qty", { qty: data.quantity })}
            </dd>
          </div>
          {hasFiles && (
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {t("download.files")}
              </dt>
              <dd className="font-semibold text-foreground">
                {data.files.length} ({formatSize(totalBytes)})
              </dd>
            </div>
          )}
        </dl>

        {data.notes && (
          <div className="mt-5 rounded-lg border border-border bg-background-alt p-3">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t("download.notes")}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">
              {data.notes}
            </p>
          </div>
        )}

        {hasFiles ? (
          <>
            <a
              href={`/d/${code}/zip`}
              className={cn(buttonVariants({ variant: "default", size: "default" }), "mt-8 w-full")}
            >
              {t("download.downloadZip", { count: data.files.length })}
            </a>

            <ul className="mt-5 border-t border-border">
              {data.files.map((file, i) => (
                <li
                  key={`${file.fileName}-${i}`}
                  className="flex items-center gap-3 border-b border-border px-3 py-3 transition-colors hover:bg-secondary/50"
                >
                  <span className="min-w-0 flex-1 truncate font-mono text-sm font-medium text-foreground">
                    {file.fileName}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {formatSize(file.fileSize)}
                  </span>
                  <a
                    href={`/d/${code}/f/${i}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
                  >
                    {t("download.download")}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">{t("download.noFiles")}</p>
        )}

        {data.fileUrl && (
          <p className="mt-5 text-sm text-muted-foreground">
            {t("download.externalLink")}{" "}
            <a
              href={data.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-medium text-primary underline underline-offset-2"
            >
              {data.fileUrl}
            </a>
          </p>
        )}
      </Card>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        {t("download.privateNote")}
      </p>
    </main>
  );
}
