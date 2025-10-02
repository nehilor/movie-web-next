import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { favoritesService } from "./favorites-service"
import type { MovieSummary } from "./types"

// Query key constants
const FAVORITES_QUERY_KEY = ["favorites"]

// Favorites query
export function useFavoritesQuery() {
  return useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => favoritesService.getFavorites(),
    staleTime: 0, // Always refetch from localStorage
    gcTime: 0, // Don't cache
  })
}

// Add favorite mutation
export function useAddFavoriteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (movie: MovieSummary) => {
      favoritesService.addFavorite(movie)
      return movie
    },
    onMutate: async (movie) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY })

      // Snapshot previous value
      const previousFavorites = queryClient.getQueryData<MovieSummary[]>(FAVORITES_QUERY_KEY)

      // Optimistically update
      queryClient.setQueryData<MovieSummary[]>(FAVORITES_QUERY_KEY, (old = []) => {
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
        queryClient.setQueryData(FAVORITES_QUERY_KEY, context.previousFavorites)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY })
    },
  })
}

// Remove favorite mutation
export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (imdbID: string) => {
      favoritesService.removeFavorite(imdbID)
      return imdbID
    },
    onMutate: async (imdbID) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY })

      // Snapshot previous value
      const previousFavorites = queryClient.getQueryData<MovieSummary[]>(FAVORITES_QUERY_KEY)

      // Optimistically update
      queryClient.setQueryData<MovieSummary[]>(FAVORITES_QUERY_KEY, (old = []) =>
        old.filter((movie) => movie.imdbID !== imdbID),
      )

      return { previousFavorites }
    },
    onError: (err, imdbID, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(FAVORITES_QUERY_KEY, context.previousFavorites)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY })
    },
  })
}

// Check if movie is favorited
export function useIsFavorite(imdbID: string): boolean {
  const { data: favorites = [] } = useFavoritesQuery()
  return favorites.some((movie) => movie.imdbID === imdbID)
}

// Clear all favorites mutation
export function useClearFavoritesMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      favoritesService.clearFavorites()
    },
    onSuccess: () => {
      queryClient.setQueryData(FAVORITES_QUERY_KEY, [])
    },
  })
}
