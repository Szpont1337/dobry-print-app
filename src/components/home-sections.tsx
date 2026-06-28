import { CreditCard, Settings2, Truck, UploadCloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button, Container, Section, SectionHeader } from "@/components/ui";

const STEPS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Settings2,
    title: "Skonfiguruj",
    desc: "Wybierz produkt, format i nakład. Cena z VAT liczy się na żywo.",
  },
  {
    icon: UploadCloud,
    title: "Wgraj plik",
    desc: "Dodaj projekt — sprawdzenie i przygotowanie do druku masz w cenie.",
  },
  {
    icon: CreditCard,
    title: "Zapłać online",
    desc: "BLIK, karta, Przelewy24 lub Apple/Google Pay. Faktura VAT od ręki.",
  },
  {
    icon: Truck,
    title: "Odbierz",
    desc: "Druk i wysyłka kurierem lub do paczkomatu — zwykle w 24–48 h.",
  },
];

export function HowItWorks() {
  return (
    <Section spacing="md" alt>
      <SectionHeader
        index="02"
        eyebrow="Prosto i szybko"
        title="Jak to działa"
        description="Cztery kroki od pomysłu do gotowego druku pod Twoimi drzwiami."
      />

      <ol className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative flex h-full flex-col gap-4 border-r border-b border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary">
                <step.icon aria-hidden className="size-5" strokeWidth={2.2} />
              </span>
              <span className="font-mono text-3xl font-extrabold tracking-tight text-border">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function CtaBand() {
  return (
    <Section spacing="sm">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-hero-card-from to-hero-card-to px-6 py-13 text-footer-foreground shadow-lg sm:px-13">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
                Gotowy na druk najwyższej jakości?
              </h2>
              <p className="mt-2 max-w-lg text-footer-foreground/70">
                Skonfiguruj produkt w 2 minuty i zobacz cenę od razu — bez zakładania konta.
              </p>
            </div>
            <Button href="/#produkty" variant="accent" size="lg" className="shrink-0">
              Rozpocznij wycenę
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
