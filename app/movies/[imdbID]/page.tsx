"use client"

import { useParams } from "next/navigation"
import { useMovieDetailQuery } from "@/lib/queries"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Star, Globe, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MovieDetailPage() {
  const params = useParams()
  const imdbID = params.imdbID as string

  const { data: movie, isLoading, isError, error } = useMovieDetailQuery(imdbID)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-8 w-32 mb-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>
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
          <h2 className="text-xl font-semibold mb-2">Movie not found</h2>
          <p className="text-muted-foreground">{error instanceof Error ? error.message : "Failed to load movie details"}</p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No movie data available</h2>
          <p className="text-muted-foreground">The movie details could not be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={movie.Poster || "/placeholder.svg"}
              alt={`${movie.Title} poster`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-balance">{movie.Title}</h1>
            <p className="text-lg text-muted-foreground">{movie.Year} • {movie.Rated} • {movie.Runtime}</p>
          </div>

          {/* Plot */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Plot</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.Plot}</p>
          </div>

          {/* Movie Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Released:</span>
                <span className="text-muted-foreground">{movie.Released}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Country:</span>
                <span className="text-muted-foreground">{movie.Country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Runtime:</span>
                <span className="text-muted-foreground">{movie.Runtime}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">IMDb Rating:</span>
                <span className="text-muted-foreground">{movie.imdbRating}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Awards:</span>
                <span className="text-muted-foreground">{movie.Awards}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Genre</h3>
              <p className="text-muted-foreground">{movie.Genre}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Director</h3>
              <p className="text-muted-foreground">{movie.Director}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Writer</h3>
              <p className="text-muted-foreground">{movie.Writer}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Actors</h3>
              <p className="text-muted-foreground">{movie.Actors}</p>
            </div>
            {movie.BoxOffice && (
              <div>
                <h3 className="font-semibold mb-2">Box Office</h3>
                <p className="text-muted-foreground">{movie.BoxOffice}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
