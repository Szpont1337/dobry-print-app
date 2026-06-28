import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "@convex/_generated/api";

import { buttonClasses, Card, Eyebrow } from "@/components/ui";
import { getConvexHttp } from "@/lib/serverEnv";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pliki do druku",
  robots: { index: false, follow: false },
};

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const data = await getConvexHttp().query(api.shareLinks.getByCode, { code });
  if (!data) {
    notFound();
  }

  const totalBytes = data.files.reduce((sum, f) => sum + f.fileSize, 0);
  const hasFiles = data.files.length > 0;

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-13 sm:px-8 sm:py-21">
      <Card padding="md">
        <Eyebrow className="font-mono">DobrePrinty · pliki do druku</Eyebrow>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
          Zamówienie #{data.orderShortId}
        </h1>

        <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Produkt</dt>
            <dd className="font-semibold text-foreground">{data.productName}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Format</dt>
            <dd className="font-semibold text-foreground">{data.formatLabel}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Nakład</dt>
            <dd className="font-semibold text-foreground">
              {data.quantity} szt.
            </dd>
          </div>
          {hasFiles && (
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Pliki</dt>
              <dd className="font-semibold text-foreground">
                {data.files.length} ({formatSize(totalBytes)})
              </dd>
            </div>
          )}
        </dl>

        {data.notes && (
          <div className="mt-5 rounded-lg border border-border bg-background-alt p-3">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Uwagi do zamówienia
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
              className={buttonClasses("primary", "md", "mt-8 w-full")}
            >
              Pobierz wszystko jako ZIP ({data.files.length})
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
                    className={buttonClasses("outline", "sm", "shrink-0")}
                  >
                    Pobierz
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">
            Brak załączonych plików do tego zamówienia.
          </p>
        )}

        {data.fileUrl && (
          <p className="mt-5 text-sm text-muted-foreground">
            Link zewnętrzny do projektu:{" "}
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
        Link prywatny — udostępniaj tylko zaufanej drukarni.
      </p>
    </main>
  );
}
