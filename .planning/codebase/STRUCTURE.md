# Codebase Structure

**Analysis Date:** 2026-04-14

## Directory Layout

```
[project-root]/
├── src/                         # Application source
│   ├── app/                     # Next.js App Router
│   │   ├── (frontend)/          # Public site routes
│   │   ├── (payload)/           # Payload CMS routes
│   │   ├── globals.css          # Global styles
│   │   └── favicon.ico          # App favicon
│   ├── actions/                 # Server actions
│   ├── collections/             # Payload CMS collections
│   ├── components/              # UI components
│   ├── emails/                  # Email templates
│   ├── lib/                     # Shared utilities
│   └── payload.config.ts        # Payload config entry
├── public/                      # Static assets
├── payload.db                   # SQLite database (local)
├── next.config.ts               # Next.js config (Payload wrapper)
├── package.json                 # Dependencies/scripts
└── tsconfig.json                # TypeScript config & path aliases
```

## Directory Purposes

**`src/app/(frontend)`**
- Purpose: Public site routes and layouts
- Contains: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `sitemap.ts`, `veranstaltungen/page.tsx`
- Key files: `src/app/(frontend)/page.tsx`, `src/app/(frontend)/veranstaltungen/page.tsx`

**`src/app/(payload)`**
- Purpose: Payload CMS admin and API routes
- Contains: `admin/[[...segments]]/page.tsx`, `api/[...slug]/route.ts`, `layout.tsx`, `custom.scss`
- Key files: `src/app/(payload)/admin/[[...segments]]/page.tsx`, `src/app/(payload)/api/[...slug]/route.ts`

**`src/components`**
- Purpose: Reusable UI components
- Contains: `EventList.tsx`, `Hero.tsx`, `Header.tsx`, `FAQ.tsx`, `Newsletter.tsx`, `RegistrationModal.tsx`, `ui/button.tsx`
- Key files: `src/components/EventList.tsx`, `src/components/RegistrationModal.tsx`

**`src/actions`**
- Purpose: Server actions invoked by client components
- Contains: `registerEvent.ts`
- Key files: `src/actions/registerEvent.ts`

**`src/collections`**
- Purpose: Payload CMS schemas
- Contains: `Events.ts`, `Participants.ts`, `Media.ts`, `Users.ts`
- Key files: `src/collections/Events.ts`, `src/collections/Participants.ts`

**`src/emails`**
- Purpose: React-email templates
- Contains: `EventConfirmation.tsx`
- Key files: `src/emails/EventConfirmation.tsx`

**`src/lib`**
- Purpose: Utilities and shared helpers
- Contains: `utils.ts`

## Key File Locations

**Entry Points:**
- `src/app/(frontend)/page.tsx`: Homepage
- `src/app/(frontend)/veranstaltungen/page.tsx`: Event listing page
- `src/app/(payload)/admin/[[...segments]]/page.tsx`: Payload admin
- `src/app/(payload)/api/[...slug]/route.ts`: Payload REST API

**Configuration:**
- `src/payload.config.ts`: Payload CMS configuration
- `next.config.ts`: Next.js config wrapped by Payload
- `tsconfig.json`: Path aliases (`@/*`, `@payload-config`)

**Core Logic:**
- `src/actions/registerEvent.ts`: Registration flow
- `src/components/EventList.tsx`: Event rendering and registration modal triggers

**Testing:**
- Not detected (no `tests/`, `*.test.*`, or `*.spec.*` files found)

## Naming Conventions

**Files:**
- `page.tsx` and `layout.tsx` for routes/layouts in `src/app`
- PascalCase component files in `src/components` (e.g., `EventList.tsx`)

**Directories:**
- Route groups wrapped in parentheses (e.g., `src/app/(frontend)`, `src/app/(payload)`)
- Collection files named after model (e.g., `src/collections/Events.ts`)

## Where to Add New Code

**New Feature:**
- Primary code: `src/app/(frontend)/<route>/page.tsx`
- Tests: Not applicable (no test structure present)

**New Component/Module:**
- Implementation: `src/components/<ComponentName>.tsx`

**Utilities:**
- Shared helpers: `src/lib/utils.ts`

## Special Directories

**`.next/`**
- Purpose: Next.js build artifacts
- Generated: Yes
- Committed: No

**`payload.db`**
- Purpose: SQLite database for Payload CMS
- Generated: Yes
- Committed: No (ignored in `.gitignore`)

---

*Structure analysis: 2026-04-14*
