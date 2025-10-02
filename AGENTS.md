# Engineering Agents & Conventions (Frontend - Next.js)

## Mission
Deliver a minimal, fast UI with Search and Favorites, powered by TanStack Query, with predictable data flows and simple components.

## Golden Rules
- **Data fetching**: TanStack Query for all network I/O.
- **Query Keys**: `['movies', 'search', { q, page }]` and `['favorites']`.
- **Mutations**: Optimistic updates for favorites; rollback on error.
- **Components**: Presentational components stay dumb; containers wire data.
- **Fetch Client**: Single `api.ts` reading `NEXT_PUBLIC_API_BASE`.
- **UX**: Loading spinners, empty states, error messages.

## Pages
- `/` Search (input + grid results + favorite toggle)
- `/favorites` Favorites list (remove button)

## Accessibility & Mobile
- Semantic HTML, alt text on posters, keyboard focus states.
- Responsive grid: `grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))`.

## Non-Goals
- Global state libraries (React Query cache is enough).
- Design system completeness (keep it minimal).
