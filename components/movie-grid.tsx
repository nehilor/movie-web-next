import { MovieCard } from "./movie-card"
import type { MovieSummary } from "@/lib/types"

interface MovieGridProps {
  movies: MovieSummary[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}
