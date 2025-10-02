# Movie Search & Favorites App

A modern, production-ready movie search and favorites management application built with Next.js, TypeScript, TanStack Query, and Tailwind CSS.

## Overview

This frontend application provides a comprehensive movie search interface with favorites management. It integrates with a NestJS backend API and uses localStorage for client-side favorites persistence. The application features responsive design, real-time search, pagination, and optimistic UI updates.

## Features

- **Movie Search**: Real-time search with debounced input and pagination
- **Movie Details**: Detailed movie information pages
- **Favorites Management**: Add/remove movies from favorites with localStorage persistence
- **Responsive Design**: Mobile-first, accessible UI with smooth transitions
- **Loading States**: Skeleton loaders and proper error handling
- **Pagination**: Configurable results per page with sorting options
- **Type Safety**: Full TypeScript support with runtime validation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **Validation**: Zod
- **State Management**: React hooks with localStorage
- **Package Manager**: pnpm

## Prerequisites

- Node.js 18+
- pnpm package manager
- Backend API running on port 4000

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Project Structure

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Search page
├── favorites/page.tsx      # Favorites page
├── movies/[imdbID]/page.tsx # Movie details page
├── providers.tsx           # React Query provider
└── globals.css            # Global styles

components/
├── ui/                     # Reusable UI primitives
├── navbar.tsx             # Navigation component
├── search-bar.tsx         # Search input component
├── movie-grid.tsx         # Movie grid layout
├── movie-card.tsx         # Individual movie card
├── pagination.tsx         # Pagination controls
└── pagination-controls.tsx # Pagination settings

lib/
├── api.ts                 # API client with Zod validation
├── queries.ts             # TanStack Query hooks
├── favorites-queries.ts    # Favorites-specific queries
├── favorites-service.ts   # localStorage service
├── types.ts               # TypeScript interfaces
├── schemas.ts             # Zod schemas
└── utils.ts               # Utility functions

hooks/
├── use-mobile.ts          # Mobile detection hook
└── use-toast.ts           # Toast notifications hook
```

## Backend Integration

The application connects to a NestJS backend API running on port 4000. The backend provides:

- Movie search endpoints with pagination and sorting
- Movie details by IMDb ID
- Health check endpoint

### API Endpoints Used

- `GET /movies/search` - Search movies with pagination
- `GET /movies/:imdbID` - Get movie details
- `GET /health` - Health check

## Favorites Management

Favorites are managed entirely on the client-side using localStorage:

- **Storage**: Browser localStorage with automatic persistence
- **Service**: Dedicated service for CRUD operations
- **Validation**: Zod schemas for data integrity
- **Optimistic Updates**: Instant UI feedback with error rollback
- **Cross-page Sync**: Favorites sync across all pages

## Responsive Design

The application is built with a mobile-first approach:

- **Breakpoints**: Responsive grid layouts for all screen sizes
- **Touch-friendly**: Optimized for mobile interactions
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized images and lazy loading

## State Management

- **Server State**: TanStack Query for API data caching and synchronization
- **Client State**: React hooks for UI state management
- **Persistence**: localStorage for favorites data
- **URL State**: Search parameters synced with URL for bookmarking

## Configuration

### Environment Variables

Create `.env.local` for custom configuration:

```env
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

### Backend Connection

Ensure the backend API is running on port 4000. The frontend will automatically connect to:
- `http://localhost:4000` for API calls
- CORS is pre-configured for this setup

## Development Notes

- Favorites persist across browser sessions using localStorage
- Search parameters are preserved in URL for bookmarking
- All API responses are validated with Zod schemas
- TypeScript ensures compile-time type safety
- Optimistic updates provide instant user feedback
- Error boundaries handle API failures gracefully

## Performance Features

- **Debounced Search**: Reduces API calls during typing
- **Skeleton Loading**: Improves perceived performance
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: TanStack Query intelligent caching strategy

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT