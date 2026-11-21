# Evidence Review Template — Para

Use this template to evaluate one route or stop claim before updating Para's preliminary transit data.

Copy this template for each claim. Do not combine unrelated claims into one review.

## Review metadata

- **Review ID:** `review-YYYY-MM-DD-route-code-claim`
- **Route ID:** `route-example`
- **Stop ID:** `stop-example` or `not applicable`
- **Claim being evaluated:**
- **Existing Para value:**
- **Proposed value:**
- **Reviewer:**
- **Review date:**
- **Evidence confidence:** `low`, `medium`, or `high`

## Claim categories

Choose one category:

- Route endpoints
- Intermediate stops
- Stop sequence
- Direction
- Route geometry
- Fare
- Schedule
- Travel time
- Accessibility information
- Other

## Source information

Record one source per review. Repeat the template for each additional source.

- **Publisher or organization:**
- **Source title:**
- **Source type:** `government document`, `transit operator publication`, `credible secondary publication`, `map reference`, `documented observation`, or `other`
- **Original URL or reference:**
- **Publication or update date:**
- **Relevant page, section, or excerpt:**
- **Date reviewed:**

## Evidence evaluation

- **What the source explicitly supports:**
- **What the source does not establish:**
- **Whether the source is official:**
- **Whether the source is current:**
- **Whether the information conflicts with another source:**
- **Conflicting information, if any:**

## Decision

Choose one:

- `keep_unverified`
- `keep_partially_verified`
- `mark_verified`
- `mark_outdated`
- `defer_until_more_evidence`

Decision reason:

## Limitations

List every limitation, uncertainty, or missing piece of evidence.

## Reviewer confirmation

- [ ] The claim was evaluated independently from unrelated route attributes.
- [ ] No unsupported value was invented.
- [ ] No geometry was inferred from stop coordinates.
- [ ] No fare or schedule was estimated without a documented heuristic.
- [ ] The route remains `verified: false` unless all required evidence is present.
- [ ] `npm run validate:data` was run after any data change.
