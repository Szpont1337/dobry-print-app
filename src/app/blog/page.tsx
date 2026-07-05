import type { Metadata } from "next";
import { BlogListFilters } from "@/components/blog-list-filters";
import { Header } from "@/components/header";
import { Eyebrow } from "@/components/ui";
import { getAllArticles } from "@/data/artykuly";
import { getReadTime } from "@/lib/blog-utils";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog DobrePrinty — poradniki, design, technologia druku",
  description:
    "Praktyczne poradniki o druku online: jak przygotować plik PDF, wybór papieru, CMYK, projektowanie ulotek. 30+ artykułów dla firm i projektantów.",
  alternates: { canonical: "https://www.dobreprinty.pl/blog" },
  openGraph: {
    title: "Blog DobrePrinty — poradniki o druku online",
    description:
      "30+ artykułów o przygotowaniu plików, wyborze papieru, projektowaniu ulotek i wizytówek.",
    url: "https://www.dobreprinty.pl/blog",
    siteName: "DobrePrinty",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const all = getAllArticles();
  const items = all.map((a) => ({
    ...a,
    readTime: "sections" in a ? getReadTime(a.sections) : undefined,
  }));

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-8 pb-13 sm:pt-13 sm:pb-21">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04)_0%,_transparent_60%)]"
        />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Eyebrow className="font-mono">Blog DobrePrinty</Eyebrow>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Poradniki o druku online,{" "}
            <span className="text-primary">designie i materiałach</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Praktyczne artykuły o przygotowaniu plików, wyborze papieru,
            kolorach CMYK i projektowaniu materiałów reklamowych. Pisane przez
            zespół DobrePrinty dla firm, projektantów i mikroprzedsiębiorców.
          </p>
        </div>
      </section>

      <section className="bg-background pb-21">
        <BlogListFilters items={items} />
      </section>
    </main>
  );
}
