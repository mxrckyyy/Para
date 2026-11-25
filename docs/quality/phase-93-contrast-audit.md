# Phase 93 — Contrast Audit

## A. Methodology

- WCAG 2.1 relative-luminance formula applied to resolved hex token values.
- Thresholds: normal text 4.5:1; large text 3:1; non-text UI components 3:1.
- Both light (`:root`) and dark (`html.dark`) themes measured.
- Only tokens actually used in the UI are reported.

## B. Results — Light theme

| Combination                        | Ratio     | Threshold | Result              |
| ---------------------------------- | --------- | --------- | ------------------- |
| text on bg                         | 16.88     | 4.5       | Pass                |
| text on surface                    | 17.74     | 4.5       | Pass                |
| text-secondary on bg               | 9.81      | 4.5       | Pass                |
| text-secondary on surface          | 10.31     | 4.5       | Pass                |
| text-muted on bg                   | 7.19      | 4.5       | Pass                |
| text-muted on surface              | 7.56      | 4.5       | Pass                |
| text-muted on surface-muted        | 6.87      | 4.5       | Pass                |
| white on primary (button)          | 5.02      | 4.5       | Pass                |
| primary on primary-soft (badge)    | 4.57      | 4.5       | Pass (borderline)   |
| error on bg/surface                | 4.60/4.83 | 4.5       | Pass                |
| info on bg                         | 4.92      | 4.5       | Pass                |
| success on bg                      | 3.14      | 4.5/3.0   | Large text only     |
| warning on bg (icon)               | 3.03      | 3.0       | Pass (non-text)     |
| input border on surface            | 1.24      | 3.0       | Fail (UI component) |
| border on bg                       | 1.18      | 3.0       | Fail (UI component) |
| border-strong on bg                | 1.40      | 3.0       | Fail (UI component) |
| focus ring (primary) on surface/bg | 5.02/4.77 | 3.0       | Pass                |

## C. Results — Dark theme

| Combination                                | Ratio     | Threshold | Result              |
| ------------------------------------------ | --------- | --------- | ------------------- |
| text on bg                                 | 17.22     | 4.5       | Pass                |
| text on surface                            | 16.13     | 4.5       | Pass                |
| text-secondary on bg                       | 15.31     | 4.5       | Pass                |
| text-secondary on surface                  | 14.34     | 4.5       | Pass                |
| text-muted on bg                           | 7.46      | 4.5       | Pass                |
| text-muted on surface                      | 6.99      | 4.5       | Pass                |
| text-muted on surface-muted                | 6.16      | 4.5       | Pass                |
| button text (#111827) on primary (#22c55e) | 7.79      | 4.5       | Pass                |
| primary on primary-soft (badge)            | 4.00      | 4.5       | Fail (normal text)  |
| primary-hover on primary-soft              | 5.23      | 4.5       | Pass                |
| error on bg/surface                        | 6.85/6.42 | 4.5       | Pass                |
| success on bg                              | 8.32      | 4.5       | Pass                |
| warning on bg                              | 8.82      | 4.5       | Pass                |
| info on bg                                 | 7.45      | 4.5       | Pass                |
| input border on surface/bg                 | 1.24/1.32 | 3.0       | Fail (UI component) |
| border on bg                               | 1.32      | 3.0       | Fail (UI component) |
| border-strong on bg                        | 1.58      | 3.0       | Fail (UI component) |
| focus ring (primary) on surface/bg         | 7.79/8.32 | 3.0       | Pass                |

## D. Findings and corrections

1. **Dark primary-on-primary-soft badge (4.00, fail)** — used in `DataStatusBadge` and autocomplete active suggestion. **Fixed:** switched to `dark:text-primary-hover` (#4ade80, 5.23) in both components, consistent with `JourneyCard` which already used it. (2 files changed.)

2. **Input/subtle borders (1.18–1.58, fail <3:1)** — `border`, `border-strong`, `input border` all below 3:1 against backgrounds. These are decorative/subtle separators. Strictly fail WCAG 1.4.11 for UI components, but raising them to 3:1 would visibly darken all borders and alter the established minimalist design. **Not changed** — documented as a design tradeoff. Proposed minimal correction (if desired): darken light borders to ~#9ca3af (3:1+) and dark borders to ~#4b5563, but this is a design decision for a future phase.

3. **Success (3.14) / warning (3.03) as normal text** — only used as an icon (warning) and not as normal text (success). No change needed; documented. If used as normal text in future, use darker variants.

4. **Primary-on-soft in light (4.57)** — passes but is borderline. Acceptable.

## E. Limitations

- Colors computed from static token values; dynamically generated colors (none in V1) not applicable.
- Focus indicators measured against adjacent background only; complex backgrounds (map tiles) not measured.
- No live contrast checker tool available; values computed via the WCAG formula manually.
