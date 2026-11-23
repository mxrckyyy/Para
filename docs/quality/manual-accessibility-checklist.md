# Manual Accessibility Checklist - Para

Status values: Not tested, Pass, Fail, Not applicable.

## Keyboard-only operation

| Item                  | Objective               | Procedure               | Expected                                    | Status     | Notes |
| --------------------- | ----------------------- | ----------------------- | ------------------------------------------- | ---------- | ----- |
| Tab navigation        | Reach all controls      | Tab through each page   | All interactive elements reachable          | Not tested |       |
| Shift+Tab             | Reverse navigation      | Shift+Tab through forms | Focus moves backward logically              | Not tested |       |
| Visible focus         | Focus indicator present | Tab through controls    | Visible ring on each control                | Not tested |       |
| Focus order           | Logical order           | Tab through home page   | Origin, swap, destination, submit, location | Not tested |       |
| Skip link             | Skip to main content    | Tab first, activate     | Focus moves to main                         | Not tested |       |
| Autocomplete keyboard | Select via keyboard     | Type, arrow keys, Enter | Suggestion selected, input updated          | Not tested |       |
| Escape key            | Close autocomplete      | Open list, press Escape | List closes                                 | Not tested |       |
| No keyboard traps     | Exit all components     | Tab through all         | No trapped focus                            | Not tested |       |

## Screen-reader testing

Recommended combinations: NVDA+Firefox/Chrome, VoiceOver+Safari (macOS).

| Item                        | Objective             | Procedure          | Expected                                  | Status     | Notes |
| --------------------------- | --------------------- | ------------------ | ----------------------------------------- | ---------- | ----- |
| Page title                  | Announced             | Load each page     | Title announced                           | Not tested |       |
| Main landmark               | Identified            | Navigate landmarks | Main region announced                     | Not tested |       |
| Heading hierarchy           | Logical               | Read headings      | H1 then H2/H3 in order                    | Not tested |       |
| Form labels                 | Associated            | Focus inputs       | Labels announced                          | Not tested |       |
| Required instructions       | Clear                 | Inspect validation | Errors announced via role=alert           | Not tested |       |
| Autocomplete announcements  | Suggestions announced | Use autocomplete   | Options and active descendant announced   | Not tested |       |
| Journey result descriptions | Meaningful            | Read results       | Route, duration, distance, fare announced | Not tested |       |
| Saved controls              | Clear labels          | Use save/remove    | Button purpose announced                  | Not tested |       |
| Map alternative info        | Stop list available   | Read map page      | Listed stop locations announced           | Not tested |       |
| Status notices              | Announced             | Load results       | Preliminary-data notice in role=note      | Not tested |       |

## Visual accessibility

| Item                       | Objective          | Procedure             | Expected                               | Status     | Notes |
| -------------------------- | ------------------ | --------------------- | -------------------------------------- | ---------- | ----- |
| Text contrast              | WCAG AA            | Inspect tokens        | >=4.5:1 normal text                    | Not tested |       |
| Control contrast           | WCAG AA            | Inspect buttons       | >=3:1 non-text                         | Not tested |       |
| Focus indicator visibility | Visible            | Tab in both themes    | Ring visible                           | Not tested |       |
| Text zoom 200%             | No overflow        | Browser zoom 200%     | Content readable, no horizontal scroll | Not tested |       |
| Browser zoom               | Layout stable      | Zoom in/out           | Layout adapts                          | Not tested |       |
| Text wrapping              | No truncation      | Long stop names       | Wraps gracefully                       | Not tested |       |
| Dark theme readability     | Contrast in dark   | Toggle dark           | All text readable                      | Not tested |       |
| Reduced motion             | Respect preference | Enable reduced motion | Animations disabled                    | Not tested |       |

## Interaction and cognitive accessibility

| Item                    | Objective      | Procedure        | Expected         | Status     | Notes |
| ----------------------- | -------------- | ---------------- | ---------------- | ---------- | ----- |
| Clear button labels     | Understandable | Read all buttons | Purpose clear    | Not tested |       |
| Validation messages     | Understandable | Submit empty     | Clear error text | Not tested |       |
| Consistent navigation   | Predictable    | Navigate pages   | Nav consistent   | Not tested |       |
| No color-only signaling | Redundant cues | Check badges     | Text + color     | Not tested |       |
