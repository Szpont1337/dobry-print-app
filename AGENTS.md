<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions (via-app)

## Components & rendering
- `page.tsx` and `layout.tsx` are ALWAYS server components — never put `"use client"` in them. Keep data fetching / composition there. Push interactivity down into child components that may be client (`"use client"`), and render those from the server page/layout.

## Data & state
- Minimize `useEffect` — avoid it unless no alternative.
- Server state: always `@tanstack/react-query` via `useQuery`/`useMutation`. Handle loading with `isLoading`/`isPending` from the hook result (and `isError` as needed) — no Suspense, no `useSuspenseQuery` (it throws during SSR and triggers reload loops). Never inline `queryKey`/`queryFn`/`mutationFn` at the call site — pull them from the central query-options factory and spread the result: `const myData = useQuery(queries.me.company())`. Define options with `queryOptions`/`mutationOptions` in the factory (global in `src/lib/queries`, feature-specific colocated in the route's folder).
- Client state: `zustand` store. Avoid `useContext`/React Context.
- URL search params / query state: always `nuqs`.
- Timers/animations: always use the `useTimeout` hook from `src/hooks/` — never a raw `setTimeout`. No uncleared timeouts/animations, ever (the hook handles teardown).
- **Optimistic by default — never block the UI on the server.** Every user action that mutates server state (save, dismiss / "not for me", add to board, "we're on it", like, follow, etc.) must apply its result to the client *instantly* and fire the request in the background ("fire-and-forget"): the server lands whenever it lands. Update the query cache optimistically in the mutation's `onMutate` (snapshot → patch via `setQueryData`), roll back in `onError`, and reconcile in `onSettled` — and prefer invalidating only the *other* views (not the one you just patched) so a slow/eventual backend can't revert the UI mid-action. Surface failures with a `sonner` toast (+ rollback), never by withholding the action.
- **Corollary — never gate one action on another's pending state.** Do NOT `disabled={mutation.isPending}` an action button, and never share one pending flag across multiple buttons (it makes any in-flight request freeze the whole surface). A long-running or blocking action MUST be optimistically applied and given a transition (instant local state flip + animation) so it never blocks other actions. `isPending` is for inline spinners/affordances only, not for disabling interaction.

## Data sourcing — never mock by default
- Never mock data. First look at the backend (`src/server/` queries/mutations + the available endpoints) and wire real data through it.
- Only if the endpoint genuinely doesn't exist yet: add a temporary mock, clearly mark it in code (e.g. `// MOCK: <what> — no endpoint yet`), and add an `unmock` entry to `TODO.md` listing exactly which data is mocked and where, so it gets replaced once the endpoint lands.

## Forms & validation
- Forms: always `@tanstack/react-form-nextjs`.
- Validation: always `zod`.

## UI & styling
- Build from reusable primitives in `@/components/ui`; compose new components from them, don't reinvent.
- All text/typography via the `Typography` component — no raw heading/text tags.
- Design system only: use colors/tokens from `src/app/globals.css`. Never add custom Tailwind colors or hardcoded color values anywhere.
- Joining Tailwind classes: always use the helpers from `src/utils/tailwind.ts`. Use `cn` when there are dynamic/conditional classes or a passed `className` prop (merges + dedupes); use `cnJ` for static joins with no computation.
- Toasts (errors, info, success): `sonner`.
- Numbers/counters: `@number-flow/react`.
- Charts: `recharts`.
- Tables: always `@tanstack/react-table`. Use the existing table component in `src/components/ui/table.tsx` — it holds all the table logic; only feed it your mapped data, nothing more.
- SVGs: SVGR is wired via the Turbopack rule in `next.config.ts`. Every `.svg` lives under `src/assets/` and is imported as a React component (`import Logo from "@/assets/logo.svg"`), then styled with `className` (`size-*`, `text-*`). Don't inline raw `<svg>` markup. Type decl: `src/types/svg.d.ts`.
- Spacing scale (Fibonacci / golden-ratio): all padding, margin, and gap values come from the Fibonacci subset of the Tailwind spacing scale — **`1, 2, 3, 5, 8, 13, 21, 34`** (i.e. `p-3`, `gap-5`, `m-8`, `px-13`, …). Never use non-Fibonacci steps (`4, 6, 7, 9, 10, 11, 12, …`) and never arbitrary spacing (`p-[18px]`). Keep spacing consistent — reuse the same step for the same role across components. The base unit is `--spacing` in `globals.css`; the Fibonacci progression preserves the golden-ratio rhythm.
- Border radius: never `rounded-full` — use `rounded-lg` for everything (buttons, chips, badges, pills, avatars, dots, icon buttons, etc.). No fully-round / pill shapes anywhere. The only acceptable exception is a genuinely circular loading spinner where a square border would look broken; everything else is `rounded-lg`.

## Code structure & reuse
- Reusable helpers (e.g. `fmtDate(props)`) live in `src/utils/`. Don't repeat code — extract.
- Use the reusable hooks in `src/hooks/` (e.g. `useTimeout`, `useSorting`, `useSearchInput`, `useColumnFilters`, `usePagination`) whenever applicable — no inline reimplementation.
- DRY is a hard rule: anything that appears more than once becomes a reusable component / hook / util. Never duplicate logic inline.
- Repeated UI is data-driven: when many instances render the same component (nav items, cards, stats, fields…), define an array of their data and `.map()` over it — never copy-paste the component N times. Put the array in the colocated `constant` folder.
- Colocate by feature: anything specific to a route (e.g. `app/dashboard`) — its components, hooks, utils, non-reusable code — lives in that route's folder (`app/dashboard/components`, `.../hooks`, `.../utils`). Only truly global code goes in top-level `src/` folders (`src/components`, `src/hooks`, `src/utils`).
- Don't dump everything in one file — split by concern.
- All file and folder names are `kebab-case` (e.g. `use-timeout.ts`, `company-table.tsx`) — no exceptions.
- No inline magic values — every constant lives in a `constant` folder, no exceptions. Global constants go in `src/constant/`; feature-specific constants go in that route's own `constant` folder (per the colocation rule above). E.g. `MAX_FILE_SIZE`, `DEFAULT_PAGE`, `DEFAULT_PAGE_SIZE`, `PAGE_PARAM_KEY`, `DEFAULT_DEBOUNCE_DELAY` — never inlined at the use site.

## Environment variables
- All env vars are typed and zod-validated in `src/config/`. Never read `process.env` directly anywhere else.
- **Client/shared code:** `import { clientEnv } from "@/config/env.client"` — only `NEXT_PUBLIC_*` vars, safe in the browser bundle, importable from client and server.
- **Server-only code:** `import { env } from "@/config/env"` — merges the public client env with server secrets. Guarded by `import "server-only"`, so importing it from a client component is a build error. Never import this in client code.
- Adding a var: server secret → add to the schema in `env.ts`; public var → add to the schema in `env.client.ts` (with `NEXT_PUBLIC_` prefix). Also add it to `.env.local`.

## Routes
All routes live in `src/utils/route.ts` as builder functions (`() => "/path"`, with params as args), never bare strings. Reference them via these consts — never hardcode a path or URL anywhere.
- **Always English** — both the const keys and the URL path segments (e.g. `MY_COMPANY: () => "/my-company"`, not `MOJA_FIRMA: () => "/moja-firma"`). No Polish (or other non-English) in routes, ever.
- **`APP_ROUTES`** — internal app (page) routes. Register every new page route here.
- **`SERVER_ROUTES`** — all server-side routes (route handlers / server endpoints, e.g. `AUTH_CALLBACK: () => "/auth/callback"`). Register every server route here.
- **`EXTERNAL_ROUTES`** — external (off-app) URLs.

## Backend API — `src/server/`
The only way to talk to the VIA Go backend. Mirrors the `@via/api-client` package factory pattern, kept local. Never call `fetch`/`axios` against the API directly, and never hand-write request/response types — always go through this layer.

- **Schemas are generated, never hand-written.** `src/server/generated/**/*.zod.ts` is `buf` output (custom Zod plugin in `scripts/protoc-gen-via-zod.ts`, template `buf.gen.yaml`). After any proto change run `bun run generate`. Do not edit generated files.
- **Transport:** `src/server/client/` — `ViaApiClient` (singleton, namespaces per service), `axios.ts` (Connect-over-JSON, injects `X-API-Key`, auto-refresh on 401), `transport.ts` (Zod-validates req/res), `errors.ts` (`ViaApiError`). Service FQNs in `client/services.ts`. Tunables (stale time, retries, refresh URL, header names) in `src/server/constant/`.
- **Queries:** `src/server/queries/` — each is a `queryOptions(client, req)` factory; keys come from the `queryKeys` factory in `queries/keys.ts`. Consume with `useQuery(api.query.<svc>.<m>(req))`.
- **Mutations:** `src/server/mutations/` — each is a `(client) => UseMutationOptions` factory; keys from `mutationKeys` in `mutations/keys.ts`.
- **Hooks:** `useViaAPI()` returns `{ query, mutation }`; `useViaClient()` returns the raw client. Both require `ViaProviders` (mounted in root layout).
- **Adding an endpoint:** update the proto (in the monorepo `proto/`), `bun run generate`, add the namespace method in `client/namespaces/<svc>.ts`, then add the query/mutation + its key. Request types via `input<typeof XRequestZ>`, responses via `output<typeof XResponseZ>`.
- Import everything from `@/server` (the barrel) or its subpaths.
