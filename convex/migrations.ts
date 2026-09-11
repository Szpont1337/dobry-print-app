import { v } from "convex/values";

import { internalMutation, type MutationCtx } from "./_generated/server";

// Jednorazowa migracja po usunięciu sprzedaży „na firmę" i rozbicia ceny na
// netto/VAT: kasuje z dokumentów pola, których nie ma już w schemacie
// (`companyName`, `taxId`, `netTotal`, `vatTotal`). Bez tego `convex deploy`
// odrzuci schemat na istniejących zamówieniach i profilach.
//
// Kolejność uruchomienia:
//   1. w `convex/schema.ts` tymczasowo: defineSchema({ ... }, { schemaValidation: false })
//   2. bunx convex deploy
//   3. bunx convex run migrations:dropLegacyOrderFields '{}'  — powtarzaj,
//      dopóki w odpowiedzi `isDone` nie będzie `true` (jeden przebieg czyści
//      `batch` dokumentów); to samo dla migrations:dropLegacyProfileFields
//   4. zdejmij `schemaValidation: false` i zrób deploy jeszcze raz
//   5. usuń ten plik

const DEFAULT_BATCH = 200;
const LEGACY_ORDER_FIELDS = ["companyName", "taxId", "netTotal", "vatTotal"];
const LEGACY_PROFILE_FIELDS = ["companyName", "taxId"];

/** Kasuje z dokumentu pola spoza schematu. Zwraca true, jeśli coś zmieniło. */
async function stripFields(
  ctx: MutationCtx,
  doc: Record<string, unknown> & { _id: unknown },
  fields: string[],
): Promise<boolean> {
  const patch: Record<string, undefined> = {};
  for (const field of fields) {
    if (doc[field] !== undefined) patch[field] = undefined;
  }
  if (Object.keys(patch).length === 0) return false;
  // Pola nie istnieją już w typach schematu — stąd rzutowania.
  await ctx.db.patch(doc._id as never, patch as never);
  return true;
}

export const dropLegacyOrderFields = internalMutation({
  args: { cursor: v.optional(v.string()), batch: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const page = await ctx.db.query("orders").paginate({
      numItems: args.batch ?? DEFAULT_BATCH,
      cursor: args.cursor ?? null,
    });

    let cleaned = 0;
    for (const doc of page.page) {
      if (await stripFields(ctx, doc, LEGACY_ORDER_FIELDS)) cleaned++;
    }

    return { cleaned, isDone: page.isDone, cursor: page.continueCursor };
  },
});

export const dropLegacyProfileFields = internalMutation({
  args: { cursor: v.optional(v.string()), batch: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const page = await ctx.db.query("user_profiles").paginate({
      numItems: args.batch ?? DEFAULT_BATCH,
      cursor: args.cursor ?? null,
    });

    let cleaned = 0;
    for (const doc of page.page) {
      if (await stripFields(ctx, doc, LEGACY_PROFILE_FIELDS)) cleaned++;
    }

    return { cleaned, isDone: page.isDone, cursor: page.continueCursor };
  },
});
