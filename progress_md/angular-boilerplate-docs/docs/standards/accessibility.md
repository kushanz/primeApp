# Accessibility

## Baseline

Target WCAG 2.2 AA unless product requirements specify a stricter level.

## Rules

- Use semantic HTML before ARIA.
- All controls must be keyboard accessible.
- Inputs require associated labels.
- Validation messages must be connected to inputs.
- Dialogs must manage focus.
- Do not communicate status using color alone.
- Maintain visible focus styles.
- Provide alternative text for meaningful images.
- Decorative images must use empty alternative text.
- Announce asynchronous status changes where appropriate.
- Respect reduced-motion preferences.
- Test at common browser zoom levels.

## Component Review

For every interactive component verify:

1. Can it be reached by keyboard?
2. Can it be operated by keyboard?
3. Is its name and state exposed?
4. Is focus visible?
5. Is focus moved intentionally after major UI changes?
6. Does it work without relying only on color?
