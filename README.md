# Movie Search & Favorites App

A modern, production-ready movie search and favorites management application built with Next.js, TypeScript, TanStack Query, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Data Fetching**: TanStack Query (React Query)
- **Validation**: Zod
- **Code Quality**: ESLint + Prettier

## ✨ Features

- **Movie Search**: Search for movies with debounced input and pagination
- **Favorites Management**: Add/remove movies from favorites with optimistic updates
- **Responsive Design**: Mobile-first, accessible UI with smooth transitions
- **Loading States**: Skeleton loaders and proper error handling
- **Mock API**: Local mock endpoints simulating a real backend

## 📁 Project Structure

\`\`\`
app/
  ├── layout.tsx              # Root layout with providers
  ├── page.tsx                # Search page
  ├── favorites/page.tsx      # Favorites page
  ├── providers.tsx           # React Query provider
  └── api/                    # Mock API endpoints
      ├── movies/search/route.ts
      └── favorites/route.ts
components/
  ├── ui/                     # Reusable UI primitives
  ├── navbar.tsx
  ├── search-bar.tsx
  ├── movie-grid.tsx
  ├── movie-card.tsx
  └── pagination.tsx
lib/
  ├── api.ts                  # API client with Zod validation
  ├── queries.ts              # TanStack Query hooks
  ├── types.ts                # TypeScript interfaces
  └── schemas.ts              # Zod schemas
\`\`\`

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed

### Installation

1. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

2. Run the development server:
\`\`\`bash
pnpm dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🔌 Mock API Endpoints

The app uses Next.js Route Handlers to simulate a backend:

- `GET /api/movies/search?q={query}&page={page}` - Search movies
- `GET /api/favorites` - Get all favorites
- `POST /api/favorites` - Add a favorite (body: `{ imdbID }`)
- `DELETE /api/favorites/{imdbID}` - Remove a favorite

### Simulated Latency

All endpoints include 200-800ms artificial delay to simulate real network conditions and test loading states.

## 🔄 Replacing Mocks with Real API

To connect to a real backend:

1. Update `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_BASE=https://your-api.com/api
\`\`\`

2. Ensure your backend implements the same endpoint structure
3. Update the API client in `lib/api.ts` if authentication is needed
4. Remove or disable the mock route handlers in `app/api/`

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Screen reader friendly

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layout
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎨 Design System

- Clean, modern aesthetic
- Subtle shadows and rounded corners
- Smooth transitions
- Accessible color contrast
- Consistent spacing scale

## 🧪 Data Flow

- **TanStack Query** manages all server state
- **Optimistic updates** for instant UI feedback
- **Automatic rollback** on mutation errors
- **Smart caching** with configurable stale time
- **Zod validation** ensures type safety at runtime

## 📝 Notes

- Favorites are stored in-memory and reset on server restart
- In production, replace with a database (PostgreSQL, MongoDB, etc.)
- All responses are validated with Zod schemas
- TypeScript ensures compile-time type safety
\`\`\`

```prettier file=".prettierrc"
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
