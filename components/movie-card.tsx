"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { useIsFavorite, useAddFavoriteMutation, useRemoveFavoriteMutation } from "@/lib/queries"
import type { MovieSummary } from "@/lib/types"

interface MovieCardProps {
  movie: MovieSummary
  showFavoriteButton?: boolean
}

export function MovieCard({ movie, showFavoriteButton = true }: MovieCardProps) {
  const isFavorite = useIsFavorite(movie.imdbID)
  const addFavorite = useAddFavoriteMutation()
  const removeFavorite = useRemoveFavoriteMutation()

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      removeFavorite.mutate(movie.imdbID)
    } else {
      addFavorite.mutate(movie)
    }
  }

  return (
    <Link href={`/movies/${movie.imdbID}`}>
      <Card className="group overflow-hidden rounded-2xl border-0 bg-card transition-all hover:shadow-lg cursor-pointer">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={movie.Poster || "/placeholder.svg"}
            alt={`${movie.Title} poster`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        {showFavoriteButton && (
          <Button
            onClick={handleToggleFavorite}
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all flex items-center justify-center md:hidden md:group-hover:flex"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Button>
        )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-balance">{movie.Title}</h3>
          <p className="text-xs text-muted-foreground">{movie.Year}</p>
        </div>
      </Card>
    </Link>
  )
}
