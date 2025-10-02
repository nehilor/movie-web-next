import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchJSON } from "./api"
import { SearchResponseSchema, FavoritesResponseSchema, MovieDetailSchema } from "./schemas"
import type { MovieSummary, SearchResponse, MovieDetail } from "./types"

// Search movies query
export function useMoviesSearchQuery({
  q,
  page,
}: {
  q: string
  page: number
}) {
  return useQuery({
    queryKey: ["movies", "search", { q, page }],
    queryFn: () =>
      fetchJSON<SearchResponse>(`/movies/search?query=${encodeURIComponent(q)}&page=${page}`, {}, SearchResponseSchema),
    enabled: q.length > 0,
  })
}

// Movie detail query
export function useMovieDetailQuery(imdbID: string) {
  return useQuery({
    queryKey: ["movies", "detail", imdbID],
    queryFn: () => fetchJSON<MovieDetail>(`/movies/${imdbID}`, {}, MovieDetailSchema),
    enabled: !!imdbID,
  })
}

// Favorites query
export function useFavoritesQuery() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchJSON<MovieSummary[]>("/favorites", {}, FavoritesResponseSchema),
  })
}

// Add favorite mutation
export function useAddFavoriteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (movie: MovieSummary) => {
      return fetchJSON("/favorites", {
        method: "POST",
        body: JSON.stringify({ imdbID: movie.imdbID }),
      })
    },
    onMutate: async (movie) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["favorites"] })

      // Snapshot previous value
      const previousFavorites = queryClient.getQueryData<MovieSummary[]>(["favorites"])

      // Optimistically update
      queryClient.setQueryData<MovieSummary[]>(["favorites"], (old = []) => {
        if (old.some((m) => m.imdbID === movie.imdbID)) {
          return old
        }
        return [...old, movie]
      })

      return { previousFavorites }
    },
    onError: (err, movie, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    },
  })
}

// Remove favorite mutation
export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (imdbID: string) => {
      return fetchJSON(`/favorites/${imdbID}`, {
        method: "DELETE",
      })
    },
    onMutate: async (imdbID) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["favorites"] })

      // Snapshot previous value
      const previousFavorites = queryClient.getQueryData<MovieSummary[]>(["favorites"])

      // Optimistically update
      queryClient.setQueryData<MovieSummary[]>(["favorites"], (old = []) =>
        old.filter((movie) => movie.imdbID !== imdbID),
      )

      return { previousFavorites }
    },
    onError: (err, imdbID, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    },
  })
}

// Check if movie is favorited
export function useIsFavorite(imdbID: string): boolean {
  const { data: favorites = [] } = useFavoritesQuery()
  return favorites.some((movie) => movie.imdbID === imdbID)
}
