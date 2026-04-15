---
phase: "01-events-pages"
plan: "01"
wave: 1
depends_on: []
files_modified:
  - "src/collections/Events.ts"
  - "src/app/(frontend)/page.tsx"
  - "src/app/(frontend)/veranstaltungen/page.tsx"
  - "src/components/EventList.tsx"
  - "src/components/Header.tsx"
  - "src/app/(frontend)/layout.tsx"
  - "src/app/(frontend)/sitemap.ts"
  - "src/app/(frontend)/veranstaltungen/[slug]/page.tsx"
  - "src/components/EventDetails.tsx"
  - "src/components/EventFilters.tsx"
  - "src/components/EventToolbar.tsx"
  - "src/components/EventEmptyState.tsx"
  - "src/components/EventMonthGroup.tsx"
  - "src/components/EventCardCompact.tsx"
  - "src/components/EventRegistrationButton.tsx"
  - "src/components/EventSchema.tsx"
  - "src/lib/events.ts"
  - "src/lib/ical.ts"
  - "src/app/(frontend)/kontakt/page.tsx"
  - "src/app/(frontend)/kontakt/ContactClient.tsx"
  - "src/components/EventDetailClient.tsx"
  - "src/components/EventRegistrationSummary.tsx"
  - "src/app/(frontend)/api/ical/route.ts"
autonomous: true
must_haves:
  truths:
    - "New events created in admin and set to published appear on the homepage and /veranstaltungen."
    - "Users can browse events on /veranstaltungen with filters for location and speaker, with URL params reflecting the filter state."
    - "Users can open an event detail page at /veranstaltungen/[slug] with full event info and registration action."
    - "Users can access a /kontakt page with contact details and a visible contact form or instructions."
    - "Events listing UI matches the homepage design language and includes registration CTA modal."
  artifacts:
    - path: "src/collections/Events.ts"
      provides: "Event content schema with status and slug"
      min_lines: 90
    - path: "src/app/(frontend)/veranstaltungen/page.tsx"
      provides: "Events listing page with filters and grouping"
      min_lines: 60
    - path: "src/app/(frontend)/veranstaltungen/[slug]/page.tsx"
      provides: "Event detail route"
      min_lines: 80
    - path: "src/app/(frontend)/kontakt/page.tsx"
      provides: "Kontakt page"
      min_lines: 60
    - path: "src/app/(frontend)/api/ical/route.ts"
      provides: "iCal calendar endpoint"
      min_lines: 20
  key_links:
    - from: "src/app/(frontend)/page.tsx"
      to: "Payload events collection"
      via: "payload.find with status filtering"
    - from: "src/app/(frontend)/veranstaltungen/page.tsx"
      to: "Event filters + URL params"
      via: "client filter state + query string sync"
    - from: "src/components/EventList.tsx"
      to: "Registration modal"
      via: "EventMonthGroup CTA"
    - from: "src/components/EventCardCompact.tsx"
      to: "/veranstaltungen/[slug]"
      via: "Link to detail route"
    - from: "src/app/(frontend)/veranstaltungen/[slug]/page.tsx"
      to: "EventSchema"
      via: "Schema.org JSON-LD for event"
objective: |
  Deliver a working events experience (listing, detail, registration CTA) with consistent design,
  fix event visibility from the CMS, and add /kontakt page.

tasks:
  - type: auto
    name: "Fix events visibility and shared mapping"
    files:
      - "src/collections/Events.ts"
      - "src/lib/events.ts"
      - "src/app/(frontend)/page.tsx"
      - "src/app/(frontend)/veranstaltungen/page.tsx"
    action: |
      - Update Events collection status handling to support upcoming/past and published visibility as required.
      - Centralize event mapping logic in src/lib/events.ts to avoid duplicated mapping in pages.
      - Ensure homepage and /veranstaltungen use the same mapping and status filter.
    verify: |
      - Confirm homepage and /veranstaltungen queries use the shared mapping and status filter.
      - Ensure events marked published/upcoming show in both pages.
    done: |
      - Events created in Payload with published/upcoming status appear on homepage and listing page.

  - type: auto
    name: "Build events listing layout with filters + toolbar"
    files:
      - "src/app/(frontend)/veranstaltungen/page.tsx"
      - "src/components/EventFilters.tsx"
      - "src/components/EventToolbar.tsx"
      - "src/components/EventMonthGroup.tsx"
      - "src/components/EventCardCompact.tsx"
      - "src/components/EventEmptyState.tsx"
      - "src/components/EventRegistrationButton.tsx"
      - "src/components/EventList.tsx"
    action: |
      - Implement toolbar with date range display, iCal link, view toggle, and filter toggle.
      - Implement filter sidebar with multi-select checkboxes for locations and speakers.
      - Use client-side state to filter and sync URL query params.
      - Group events by month in main list and render compact cards with CTA.
      - Ensure EventList continues to open registration modal.
    verify: |
      - Filters update results without page reload and update query params.
      - Event cards link to detail route and show CTA.
    done: |
      - /veranstaltungen renders toolbar, filters, and month-grouped event list matching design requirements.

  - type: auto
    name: "Create event detail page with schema + registration"
    files:
      - "src/app/(frontend)/veranstaltungen/[slug]/page.tsx"
      - "src/components/EventDetails.tsx"
      - "src/components/EventSchema.tsx"
    action: |
      - Add dynamic route to fetch event by slug with Payload.
      - Render detail layout with image, date/time, location, description, and CTA.
      - Inject schema.org JSON-LD for event in EventSchema.
    verify: |
      - Visiting /veranstaltungen/[slug] shows correct event details.
      - JSON-LD appears in page output.
    done: |
      - Event detail page is accessible and contains registration CTA.

  - type: auto
    name: "Add kontakt page and nav updates"
    files:
      - "src/app/(frontend)/kontakt/page.tsx"
      - "src/app/(frontend)/kontakt/ContactClient.tsx"
      - "src/components/Header.tsx"
      - "src/app/(frontend)/layout.tsx"
      - "src/app/(frontend)/sitemap.ts"
    action: |
      - Create /kontakt page with contact details and a simple contact form.
      - Update navigation and sitemap accordingly.
    verify: |
      - /kontakt renders and nav links are correct.
    done: |
      - Kontakt page is accessible and included in sitemap.

  - type: auto
    name: "Add iCal generation support"
    files:
      - "src/lib/ical.ts"
      - "src/components/EventToolbar.tsx"
    action: |
      - Implement iCal URL or file generation for event subscription.
      - Wire toolbar button to iCal link.
    verify: |
      - iCal link resolves to a valid calendar resource.
    done: |
      - Users can subscribe to event calendar from toolbar.

verification_criteria:
  - "Events listing page uses consistent palette and layout with homepage."
  - "Event registration modal opens from listing and detail CTA."
  - "Backend published/upcoming events appear in listings."

success_criteria:
  - "Events created in Payload appear on homepage and /veranstaltungen when published/upcoming."
  - "/veranstaltungen supports filters, URL params, and month grouping."
  - "/veranstaltungen/[slug] detail pages render with schema.org event data."
  - "/kontakt page exists and navigation links work."
