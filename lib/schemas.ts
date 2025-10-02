import { z } from "zod"

export const MovieSummarySchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
})

export const MovieDetailSchema = MovieSummarySchema.extend({
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Ratings: z.array(z.object({
    Source: z.string(),
    Value: z.string(),
  })),
  Metascore: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  DVD: z.string(),
  BoxOffice: z.string(),
  Production: z.string(),
  Website: z.string(),
  Response: z.string(),
})

export const SearchResponseSchema = z.object({
  Search: z.array(MovieSummarySchema),
  totalResults: z.string(),
  Response: z.string(),
})

export const FavoritesResponseSchema = z.array(MovieSummarySchema)
