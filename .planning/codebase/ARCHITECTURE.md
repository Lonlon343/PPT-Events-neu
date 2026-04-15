# Architecture

**Analysis Date:** 2026-04-14

## Pattern Overview

**Overall:** Next.js App Router with embedded Payload CMS (monolithic app + CMS)

**Key Characteristics:**
- Dual app segments for frontend and CMS under `src/app/(frontend)` and `src/app/(payload)`
- Payload CMS local API used directly in server components and server actions
- Content modeled via Payload collections in `src/collections/*.ts`

## Layers

**App Router (Routing/Pages):**
- Purpose: Defines routes, layouts, and server components
- Location: `src/app/(frontend)` and `src/app/(payload)`
- Contains: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `sitemap.ts`
- Depends on: Components from `src/components`, Payload APIs via `getPayload`
- Used by: Next.js runtime

**UI Components:**
- Purpose: Reusable UI sections and interactive elements
- Location: `src/components`
- Contains: `EventList`, `Hero`, `Header`, `FAQ`, `Newsletter`, `RegistrationModal`
- Depends on: Client libraries (`framer-motion`, `lucide-react`), Next primitives (`next/link`, `next/image`)
- Used by: Frontend pages in `src/app/(frontend)`

**Server Actions:**
- Purpose: Form submission and server-side logic
- Location: `src/actions/registerEvent.ts`
- Contains: Event registration flow, validation, and email sending
- Depends on: Payload local API (`getPayload`), Zod validation, Resend
- Used by: `src/components/RegistrationModal.tsx`

**CMS Configuration:**
- Purpose: Define CMS schema and setup
- Location: `src/payload.config.ts`, `src/collections/*.ts`
- Contains: Payload config, DB adapter, collections (events, participants, media, users)
- Depends on: `@payloadcms/*` packages
- Used by: Payload admin and API routes in `src/app/(payload)`

## Data Flow

**Homepage Event Listing:**

1. `src/app/(frontend)/page.tsx` calls `getPayload({ config: configPromise })`
2. Server component queries Payload via `payload.find({ collection: 'events', where: { status: { equals: 'published' } } })`
3. Results mapped to `EventType` and rendered by `src/components/EventList.tsx`

**Event Listing Page (`/veranstaltungen`):**

1. `src/app/(frontend)/veranstaltungen/page.tsx` reads `searchParams`
2. Builds `where` clause and queries Payload for `events`
3. Maps results to `EventType` and renders `EventList`
4. Collects `location` and `speaker` options for filters

**Event Registration:**

1. User opens modal in `src/components/EventList.tsx` → `RegistrationModal`
2. Form posts to server action `registerForEvent` in `src/actions/registerEvent.ts`
3. Action validates with Zod, checks capacity & duplicates via Payload
4. Action creates participant in `participants` collection and sends email

**State Management:**
- No global store; local component state only (e.g., `useState` in `EventList`, `Header`, `Newsletter`)

## Key Abstractions

**Payload Collections:**
- Purpose: Content schema + persistence
- Examples: `src/collections/Events.ts`, `src/collections/Participants.ts`, `src/collections/Media.ts`, `src/collections/Users.ts`
- Pattern: Define schema via `CollectionConfig` and use local API in server components/actions

**Local API Access:**
- Purpose: Server-side data access without REST
- Examples: `src/app/(frontend)/page.tsx`, `src/app/(frontend)/veranstaltungen/page.tsx`, `src/actions/registerEvent.ts`
- Pattern: `const payload = await getPayload({ config: configPromise })`

## Entry Points

**Frontend Root Layout:**
- Location: `src/app/(frontend)/layout.tsx`
- Triggers: All frontend routes in the `(frontend)` segment
- Responsibilities: Global metadata, fonts, header, base layout

**Frontend Home Page:**
- Location: `src/app/(frontend)/page.tsx`
- Triggers: `/`
- Responsibilities: Fetch events, render Hero, EventList, Newsletter, FAQ

**CMS Admin:**
- Location: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Triggers: `/admin/*`
- Responsibilities: Serve Payload admin UI

**CMS API:**
- Location: `src/app/(payload)/api/[...slug]/route.ts`
- Triggers: `/api/*`
- Responsibilities: Payload REST endpoints

## Error Handling

**Strategy:** Try/catch around Payload queries; fall back to empty list or placeholders

**Patterns:**
- `try/catch` with `console.error` in `src/app/(frontend)/page.tsx`
- `try/catch` with `console.error` in `src/app/(frontend)/veranstaltungen/page.tsx`
- Client error boundary page in `src/app/(frontend)/error.tsx`

## Cross-Cutting Concerns

**Logging:** `console.error` in server components and server actions (`src/app/(frontend)/page.tsx`, `src/actions/registerEvent.ts`)
**Validation:** Zod schema in `src/actions/registerEvent.ts`
**Authentication:** Payload auth for admin via `src/collections/Users.ts` and `src/payload.config.ts`

---

*Architecture analysis: 2026-04-14*
