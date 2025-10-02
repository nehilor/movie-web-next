import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchJSON } from "./api"
import { SearchResponseSchema, MovieDetailSchema } from "./schemas"
import type { MovieSummary, SearchResponse, MovieDetail } from "./types"

// Re-export favorites queries
export {
  useFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useIsFavorite,
  useClearFavoritesMutation
} from "./favorites-queries"

// Search movies query
export function useMoviesSearchQuery({
  q,
  pageOffset = 1,
  pageSize = 10,
  orderBy = 'imdbID',
  sortDirection = 'ascending',
}: {
  q: string
  pageOffset?: number
  pageSize?: number
  orderBy?: string
  sortDirection?: string
}) {
  return useQuery({
    queryKey: ["movies", "search", { q, pageOffset, pageSize, orderBy, sortDirection }],
    queryFn: () => {
      const params = new URLSearchParams({
        query: q,
        page_offset: pageOffset.toString(),
        page_size: pageSize.toString(),
        order_by: orderBy,
        sort_direction: sortDirection,
      })
      return fetchJSON<SearchResponse>(`/movies/search?${params.toString()}`, {}, SearchResponseSchema)
    },
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
