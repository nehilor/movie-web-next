import { MovieCard } from "./movie-card"
import type { MovieSummary } from "@/lib/types"
import { ReactNode } from "react"

interface MovieGridProps {
  movies: MovieSummary[]
  pageSize?: number
  children?: ReactNode
}

export function MovieGrid({ movies, pageSize = 10, children }: MovieGridProps) {
  // Calculate optimal grid columns based on page size
  const getGridCols = () => {
    if (pageSize <= 5) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    if (pageSize <= 10) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    if (pageSize <= 20) return "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    return "grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8"
  }

  return (
    <div className={`grid ${getGridCols()} gap-4`}>
      {children || movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}
