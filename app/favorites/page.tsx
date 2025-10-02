"use client"

import { MovieGrid } from "@/components/movie-grid"
import { MovieCard } from "@/components/movie-card"
import { useFavoritesQuery, useClearFavoritesMutation } from "@/lib/queries"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const { data: favorites, isLoading, isError, error } = useFavoritesQuery()
  const clearFavorites = useClearFavoritesMutation()

  const handleClearFavorites = () => {
    if (confirm("Are you sure you want to clear all favorites?")) {
      clearFavorites.mutate()
    }
  }

  // Calculate optimal grid columns based on favorites count
  const getGridCols = () => {
    const count = favorites?.length || 0
    if (count <= 5) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    if (count <= 10) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    if (count <= 20) return "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    return "grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8"
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">My Favorites</h1>
        <p className="text-muted-foreground text-lg">Your curated collection of favorite movies</p>
        {favorites && favorites.length > 0 && (
          <div className="mt-4">
            <Button
              onClick={handleClearFavorites}
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
            >
              Clear All Favorites
            </Button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className={`grid ${getGridCols()} gap-4`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground">{error instanceof Error ? error.message : "Failed to load favorites"}</p>
        </div>
      )}

      {!isLoading && !isError && favorites && (
        <>
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">Start adding movies to your favorites from the search page</p>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Browse Movies
              </a>
            </div>
          ) : (
            <div className={`grid ${getGridCols()} gap-4`}>
              {favorites.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} showFavoriteButton={true} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
