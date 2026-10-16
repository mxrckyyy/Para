# UI/UX Guidelines — Para

> The most important design document. Defines the visual language and user experience. Implement all UI against this document. Update when a design decision changes.

## A. Design direction

Para uses a **calm, modern, minimalist transit aesthetic**. It should feel like a trustworthy, usable transit companion—not a generic AI dashboard or a student CRUD project.

### Target feeling

- Trustworthy
- Clear
- Friendly
- Practical
- Lightweight
- Mobile-first
- Consistent
- Usable during an actual commute (one-handed, glanceable, low cognitive load)

### Principles

1. **Clarity over decoration.** Every visual element must aid understanding.
2. **Density discipline.** Show enough to decide; hide deep detail behind details view.
3. **Predictable patterns.** Same interaction patterns everywhere.
4. **Mobile first.** Design for 320px first; enhance upward.
5. **Honesty.** Label estimates; communicate uncertainty and data limits.
6. **Restraint.** Fewer colors, fewer styles, fewer animations. Do not redesign per page.

### Avoid

- Excessive gradients, especially on large surfaces
- Oversized headings
- Excessive rounded cards (no "pills everywhere")
- Heavy shadows and layered depth
- Unnecessary glassmorphism/blur
- Decorative animations
- Repetitive card layouts without differentiation
- Cluttered icon rows
- Marketing-style hero sections

### Establish original identity

Do not copy Google Maps, Transit, Moovit, or other transit apps. Build a distinct, restrained identity: green brand, calm surfaces, clear typography, original card layout, original bottom nav.

## B. Color system (design tokens)

Use green as primary brand. Define semantic CSS variables; Tailwind maps to them.

### Light theme

| Token                      | Value (approx)        | Use                                     |
| -------------------------- | --------------------- | --------------------------------------- |
| `--color-primary`          | `#15803d` (green-700) | Primary actions, brand                  |
| `--color-primary-hover`    | `#166534`             | Hover                                   |
| `--color-primary-pressed`  | `#14532d`             | Active/pressed                          |
| `--color-primary-soft`     | `#dcfce7`             | Tints, badges                           |
| `--color-bg`               | `#f7faf8`             | Page background (very light green-gray) |
| `--color-surface`          | `#ffffff`             | Cards/panels                            |
| `--color-surface-elevated` | `#ffffff`             | Modals/popovers                         |
| `--color-surface-muted`    | `#f1f5f3`             | Inset areas                             |
| `--color-text`             | `#111827`             | Primary text                            |
| `--color-text-secondary`   | `#374151`             | Secondary                               |
| `--color-text-muted`       | `#6b7280`             | Helper/meta                             |
| `--color-border`           | `#e5e7eb`             | Borders                                 |
| `--color-border-strong`    | `#d1d5db`             | Emphasis dividers                       |
| `--color-success`          | `#16a34a`             | Success                                 |
| `--color-warning`          | `#d97706`             | Warning                                 |
| `--color-error`            | `#dc2626`             | Error                                   |
| `--color-info`             | `#2563eb`             | Info (sparingly)                        |

### Dark theme

| Token                      | Value (approx)        | Use                            |
| -------------------------- | --------------------- | ------------------------------ |
| `--color-primary`          | `#22c55e` (green-500) | Primary (brighter for dark bg) |
| `--color-primary-hover`    | `#4ade80`             | Hover                          |
| `--color-primary-pressed`  | `#16a34a`             | Pressed                        |
| `--color-primary-soft`     | `#14532d`             | Tints                          |
| `--color-bg`               | `#0b1210`             | Page background                |
| `--color-surface`          | `#111a16`             | Cards                          |
| `--color-surface-elevated` | `#16211c`             | Popovers                       |
| `--color-surface-muted`    | `#1a2620`             | Inset                          |
| `--color-text`             | `#f3f4f6`             | Primary                        |
| `--color-text-secondary`   | `#e5e7eb`             | Secondary                      |
| `--color-text-muted`       | `#9ca3af`             | Muted                          |
| `--color-border`           | `#1f2d27`             | Borders                        |
| `--color-border-strong`    | `#2a3a33`             | Strong                         |
| `--color-success`          | `#22c55e`             | Success                        |
| `--color-warning`          | `#f59e0b`             | Warning                        |
| `--color-error`            | `#f87171`             | Error                          |

### Map colors

- Direct route line: primary green (slightly darker on map for contrast).
- Transfer route segments: primary green for ride 1, a distinct blue-gray for ride 2? Keep restraint: use primary green with different dash/opacity, plus transfer marker. Document: segment 1 solid green, segment 2 green with 60% opacity and dashed, transfer stop highlighted amber.
- Stop markers: neutral circles; selected/highlighted origin/destination markers green (origin) and red-orange (destination) with accessible labels (not color-only).

### Contrast

- Normal text ≥ 4.5:1; large text ≥ 3:1; UI components ≥ 3:1 against adjacent.
- Verify both themes. Do not rely on color alone (add icons/text).

## C. Typography

### Font family strategy

- Primary UI font: system stack for performance and native feel:
  `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Optional: load one web font (e.g., Inter) if desired for portfolio polish; must be self-hosted or via a privacy-friendly CDN and not block rendering. Default to system stack to keep bundle light (decision: system stack in V1; revisit if needed).
- Numeric/tabular alignment for fares/times: use `font-variant-numeric: tabular-nums`.

### Hierarchy (mobile base 16px)

| Style           | Size          | Weight  | Use                                                                                |
| --------------- | ------------- | ------- | ---------------------------------------------------------------------------------- |
| Display         | 28px / 1.2    | 700     | Page hero titles (rare)                                                            |
| H1              | 24px / 1.25   | 700     | Page title                                                                         |
| H2              | 20px / 1.3    | 600     | Section headings                                                                   |
| H3              | 18px / 1.3    | 600     | Card titles                                                                        |
| Body            | 16px / 1.5    | 400     | Default text                                                                       |
| Body small      | 14px / 1.5    | 400     | Secondary                                                                          |
| Caption         | 12px / 1.4    | 400/500 | Metadata, helper                                                                   |
| Route code      | 16px / 1.2    | 700     | Route codes (monospace optional: `ui-monospace, SFMono-Regular, Menlo, monospace`) |
| Emphasis metric | 18–20px / 1.2 | 700     | Duration/fare highlights                                                           |

### Rules

- Avoid oversized headings; H1 ≤ 24px on mobile.
- Limit font weights to 400, 500, 600, 700.
- Line height ≥ 1.4 for body.
- Truncate long stop/route names with ellipsis + tooltip/title.

## D. Spacing and layout

### Spacing scale (4px base)

`0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64` (Tailwind default aligns).

- Standard component padding: 16px (mobile), 20–24px (desktop cards).
- Page padding: ≥ 16px mobile; 24–32px desktop.
- Section gaps: 16–24px.
- Card gaps in lists: 12px.

### Content widths

- Mobile: full width with 16px page padding.
- Tablet: max content ~720px centered.
- Desktop: max content ~1120px for app; map may use wider.
- Forms: max 480px for readability.

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Behavioral breakpoints (design-driven): 320–375 (small mobile), 376–767 (mobile), 768–1023 (tablet), 1024–1439 (desktop), 1440+ (large).

### Layout shells

- Global: sticky header (optional compact) + content + mobile bottom nav.
- Desktop: header nav horizontal; no bottom nav.
- Mobile: fixed bottom nav (4 items max) with safe-area inset.
- Avoid layout shift: reserve heights for images/skeletons.

## E. Component design system

### Shared states (all interactive components)

- **Default**: base style.
- **Hover**: subtle bg/border change (not on touch).
- **Focus**: visible ring (2px primary, offset 2px) via `:focus-visible`.
- **Active/pressed**: slightly darker bg, scale(0.98) for buttons.
- **Disabled**: opacity 0.5, not-allowed cursor, no hover effects.
- **Loading**: spinner or skeleton; disable repeated actions.
- **Error**: error border + message, aria-invalid.

### Header

- Height: 56–64px.
- Contains: wordmark/logo (text "Para" with small green mark), desktop nav links, theme toggle.
- Sticky top with subtle bottom border; background `--color-surface` with slight blur acceptable but minimal.
- Mobile: compact header; brand only + theme toggle maybe; primary nav moves to bottom.

### Desktop navigation

- Horizontal links in header: Home, Map, Saved.
- Clear active state: text primary + bottom 2px primary underline OR filled pill; pick one and stay consistent. Recommendation: text color + small bottom border (underline) to avoid pill clutter.

### Mobile bottom navigation

- Fixed bottom, safe-area aware.
- 3–4 items: Home (Search), Map, Saved, (optional More/Theme in header).
- Each: icon (Lucide, 22px) + label (11px). Touch target ≥ 44×44.
- Active: primary color icon+text; inactive muted.
- Subtle top border; surface background; no heavy shadow.

### Search form

- Labels visible (not only placeholders).
- Stacked layout on mobile; inline on larger.
- Origin and destination as Combobox/autocomplete.
- Swap button between fields (icon button with aria-label).
- "Use my location" button under/beside origin.
- Primary "Find routes" button full-width on mobile.

### Autocomplete dropdown

- Combobox pattern: input with role combobox; listbox popup.
- Item: stop name (bold) + optional hint/metadata (secondary small).
- Highlight matched substring (bold).
- Keyboard: arrows navigate, Enter select, Esc close, Tab closes.
- Max height ~240px with scroll; show "No matches" state.
- Close on outside click / blur with delay.

### Origin/destination fields

- Clear labels: "Origin (where you are)" / "Destination (where you're going)".
- Status dot/icon marker inside field (origin green, destination orange) for visual parity with map.
- Error text below field.

### Swap button

- Icon (ArrowUpDown) circular, 40×40 min, accessible label "Swap origin and destination".
- Rotates 180° on activation (subtle, respect reduced motion).

### Buttons

- **Primary**: filled green, white text, rounded-md (8px), padding 10px 16px, min height 44px. Hover darker.
- **Secondary**: outlined neutral or green, transparent bg.
- **Ghost**: text/link style for tertiary.
- **Icon button**: square 40px, rounded-md, hover bg muted.
- Loading: spinner replaces label or left of label; disable.
- No gradients.

### Route cards

- Surface card, subtle border, rounded-lg (12px), padding 16px.
- Layout:
  - Top row: route code badges + type pill ("Direct" / "1 transfer"); duration bold right.
  - Second: origin→destination summary (small, muted) maybe stop names.
  - Third: transfer stop highlight if transfer.
  - Bottom: fare (bold) + "estimate" caption; chevron or "View details".
- Whole card clickable with focus ring; avoid nested competing links—use one link wrapping card or button with nested "details" button carefully (accessibility: prefer entire card as link to details, with a separate save button using stopPropagation).
- Subtle hover: border color primary-soft + maybe background muted.

### Route codes and color indicators

- Route code badge: small rounded (6px), bg primary-soft, text primary, weight 700, padding 2px 8px, border optional.
- Color indicator (left border or 4px bar) in primary green for direct; for transfer, two small stacked color bars. Never rely on color alone; include code text.

### Fare and duration

- Duration: bold, e.g., "28 min". Secondary "est." caption.
- Fare: bold, e.g., "₱15"; caption "estimate" or "verified".
- If unknown: "—" with "Not available".

### Transfer indicators

- Chip: "Transfer at [stop name]" with transfer icon.
- Amber/orange tint; not alarming. Ensure not confused with error.

### Journey steps (route details)

- Vertical timeline.
- Each step: icon + title + subtitle (stop names, route code) + metadata.
- Walk steps: muted icon; ride steps: green accent; transfer: amber.
- Connectors: thin vertical line between steps.
- Estimated times per segment in small muted text.

### Map controls

- Zoom controls default Leaflet; style lightly.
- Route selector as horizontal chips above or below map (scrollable) with active highlight.
- Legend compact: origin, destination, transfer.
- Attribution footer always visible (OSM).

### Stop markers

- Circular markers with icon or letter; popups show stop name + routes serving.
- Selected origin/destination larger with ring.
- Avoid too many markers; cluster? V1 no clustering unless needed. Limit markers to selected route's stops.

### Saved-route buttons

- Heart/bookmark icon toggle. Filled when saved, outline when not.
- Accessible label changes ("Save route"/"Remove saved route").
- Confirmation not needed; show subtle toast/notice for undo opportunity (optional, V1: simple state change acceptable).

### Theme toggle

- Icon button: sun/moon; accessible label "Switch to dark/light mode".
- Place in header. No large toggle switch.

### Empty states

- Centered illustration? Use simple icon (Lucide) + heading + helper + single CTA. Avoid heavy illustrations (optional small icon). Keep lightweight.
- Examples: no results, no saved routes, location denied.

### Loading skeletons

- Use neutral shimmer (subtle); respect reduced motion (static pulse).
- Skeleton route cards: 3 placeholders with varying widths.
- Spinner only for short actions (geolocation).

### Error messages

- Inline near field or top of form in Alert (destructive variant).
- Include what happened + how to fix.
- Accessible role="alert".
- Not overly technical.

### Confirmation messages

- Success toast or inline banner for saved (optional).
- Keep ephemeral (3s) or persistent with dismiss.

### Modal/dialog

- Use only if needed (e.g., confirm delete saved route?). V1 may avoid modals; use inline confirmation ("Remove?" with confirm/cancel).
- If modal: focus trap, Esc closes, aria-labelledby/describedby, backdrop.

## F. Screen-by-screen UX

### 1. Home/Search

- Page title "Find a jeepney route" (H1).
- Short helper line: "Enter where you are and where you're going."
- Card/panel containing form:
  - Origin combobox
  - Swap button
  - Destination combobox
  - "Use my location" (secondary/ghost with icon)
  - Primary "Find routes" button
- Below form: quick tips / "How it works" (3 short bullets) and data disclaimer.
- No results section here.

### 2. Results

- Header back? Breadcrumb maybe "Back to search" link.
- Summary: "From {origin} to {destination}" with small "Edit search" link.
- Sort note: "Sorted by estimated travel time".
- List of RouteCards.
- Empty state if none: explain, suggest swap, nearby stops, acknowledge data coverage.
- Loading skeletons while computing.
- Each card action: tap → Route Details; save icon.

### 3. Route Details

- Back link.
- Title: primary route code(s) + type.
- Origin→destination summary.
- Key metrics: duration, fare, distance (if available), transfers.
- Confidence label: "Estimates based on static data".
- Chronological steps (timeline).
- Map preview/section: full map below or link to /map?route=.
- Disclaimer about estimates and data limits.
- Save/unsave button.

### 4. Map

- Full-height map within page (minus header/nav). Min height 400px.
- Top: title + route selector chips.
- Route selector changes highlighted geometry.
- Legend.
- Empty/no-geometry state: show markers + note.
- Only load map when page visited (lazy).

### 5. Saved Routes

- H1 "Saved routes".
- Empty state explains how to save (heart icon) + CTA to search.
- List of saved journey cards (compact) with remove action and "View details"/open map.
- Show warning if some entries were skipped (invalid/outdated).

### 6. Navigation

- As described above. Active state clear.

### 7. Dark Mode

- Tokens switch; no hardcoded colors.
- Map tiles: use a dark tile provider or adjust filters; ensure attribution visible.
- Images/icons SVG adapt via currentColor.

## G. Interaction and motion

- Durations: 150ms for simple hover/color, 200–250ms for dropdowns, 200ms for theme crossfade (optional subtle).
- Easing: `cubic-bezier(0.2, 0, 0, 1)` or ease-out.
- Respect `prefers-reduced-motion`: disable transforms; reduce/eliminate transitions (opacity-only or none).
- No parallax, no bouncing, no autoplay loops.
- Swap rotation and route selection highlight transitions allowed but subtle.

## H. Accessibility

- Semantic landmarks: header, nav, main, footer.
- One H1 per page.
- Forms: label associated; error described.
- Focus ring visible always (don't remove outline without replacement).
- Combobox accessible: aria-expanded, aria-controls, aria-activedescendant, options with roles.
- Live regions for results loading/completion and saved confirmation (`aria-live="polite"`).
- Icon buttons have aria-label.
- Touch targets ≥44×44.
- Reduced motion.
- Color contrast targets as above.
- Map: provide a text alternative (list of stops already on page).
- Images alt text; decorative icons aria-hidden.

## I. Responsive behavior

### 320–375px (small mobile)

- Single column.
- Header compact.
- Bottom nav visible.
- Form stacked; primary button full width.
- Cards full width; metrics wrap.
- Page padding 16px.

### 376–767px (mobile)

- Same, more breathing room; maybe 2-column metrics.

### 768–1023px (tablet)

- Header horizontal nav appears; bottom nav may hide or remain? Recommendation: bottom nav remains for mobile ergonomics until 1024; but to avoid redundancy, switch to header nav at 768. Decision: header nav from 768, bottom nav hidden from 768. (Rationale: tablets used in landscape/desktop-like; reduce duplication.)
- Content max width ~720px centered.
- Form can be inline two columns.

### 1024–1439px (desktop)

- Centered content ~1120px.
- Map can be larger; results and map may be side-by-side on Map page? Recommendation: stacked on /map but with larger min height; on Route Details, map preview side-by-side with steps above 1024.

### 1440px+

- Same, with more whitespace; do not stretch unlimited (max-width container).

## J. Design quality rules

Before implementing a new component:

1. Re-read this document.
2. Check existing `src/components/ui/` and feature components.
3. Use established tokens; no new color/spacing/button/card without documented reason.
4. Verify all states (default/hover/focus/active/disabled/loading/error).
5. Verify at 320px width and dark mode.
6. Add accessibility attributes.

Do not redesign completed pages in later phases. If a design flaw is found, document and fix minimally with rationale.

## K. Implementation notes (Tailwind v4)

- Configure theme tokens in CSS via `@theme` (Tailwind v4) in `src/index.css`.
- Prefer semantic classes (`bg-surface`, `text-muted`) mapped to CSS variables.
- Keep one source of truth for colors; avoid arbitrary hex in components.
- Shadows: minimal (`shadow-sm` for cards/popovers only). Rounded scale: `rounded-md` (8), `rounded-lg` (12), `rounded-xl` (16) sparingly (e.g., bottom nav pill). Default card `rounded-lg`.

## L. Content and copy guidelines

- Short, plain, helpful.
- Estimates labeled "estimate"; verified sources labeled "verified".
- Disclaimers: "Route data may be incomplete or outdated. Travel times/fares are estimates."
- Avoid exclamation-heavy or marketing copy.
- Empty states guide next action.
