"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { MovieGrid } from "@/components/movie-grid"
import { Pagination } from "@/components/pagination"
import { PaginationControls } from "@/components/pagination-controls"
import { useMoviesSearchQuery } from "@/lib/queries"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isUpdatingRef = useRef(false)

  // Initialize state from URL params
  const [query, setQuery] = useState(() => searchParams.get("q") || "")
  const [pageOffset, setPageOffset] = useState(() => Number.parseInt(searchParams.get("page_offset") || "1", 10))
  const [pageSize, setPageSize] = useState(() => Number.parseInt(searchParams.get("page_size") || "10", 10))
  const [orderBy, setOrderBy] = useState(() => searchParams.get("order_by") || "imdbID")
  const [sortDirection, setSortDirection] = useState(() => searchParams.get("sort_direction") || "ascending")

  const { data, isLoading, isError, error } = useMoviesSearchQuery({
    q: query,
    pageOffset,
    pageSize,
    orderBy,
    sortDirection,
  })

  // Update URL when state changes - but only if it's different
  useEffect(() => {
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false
      return
    }

    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (pageOffset > 1) params.set("page_offset", pageOffset.toString())
    if (pageSize !== 10) params.set("page_size", pageSize.toString())
    if (orderBy !== "imdbID") params.set("order_by", orderBy)
    if (sortDirection !== "ascending") params.set("sort_direction", sortDirection)

    const newUrl = `/?${params.toString()}`
    const currentUrl = window.location.pathname + window.location.search

    // Only update if the URL is actually different
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false })
    }
  }, [query, pageOffset, pageSize, orderBy, sortDirection, router])

  // Sync state with URL params when they change (e.g., browser back/forward)
  useEffect(() => {
    const urlQuery = searchParams.get("q") || ""
    const urlPageOffset = Number.parseInt(searchParams.get("page_offset") || "1", 10)
    const urlPageSize = Number.parseInt(searchParams.get("page_size") || "10", 10)
    const urlOrderBy = searchParams.get("order_by") || "imdbID"
    const urlSortDirection = searchParams.get("sort_direction") || "ascending"

    // Only update state if URL params are different from current state
    if (urlQuery !== query || urlPageOffset !== pageOffset || urlPageSize !== pageSize || urlOrderBy !== orderBy || urlSortDirection !== sortDirection) {
      isUpdatingRef.current = true
      if (urlQuery !== query) setQuery(urlQuery)
      if (urlPageOffset !== pageOffset) setPageOffset(urlPageOffset)
      if (urlPageSize !== pageSize) setPageSize(urlPageSize)
      if (urlOrderBy !== orderBy) setOrderBy(urlOrderBy)
      if (urlSortDirection !== sortDirection) setSortDirection(urlSortDirection)
    }
  }, [searchParams, query, pageOffset, pageSize, orderBy, sortDirection])

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery)
    setPageOffset(1)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPageOffset(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handlePaginationChange = useCallback((params: {
    pageOffset: number
    pageSize: number
    orderBy: string
    sortDirection: string
  }) => {
    setPageOffset(params.pageOffset)
    setPageSize(params.pageSize)
    setOrderBy(params.orderBy)
    setSortDirection(params.sortDirection)
  }, [])

  // Calculate optimal grid columns based on page size
  const getGridCols = () => {
    if (pageSize <= 5) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    if (pageSize <= 10) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    if (pageSize <= 20) return "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    return "grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8"
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Search Movies</h1>
        <p className="text-muted-foreground text-lg">Find your favorite movies and add them to your collection</p>
      </div>

      <SearchBar initialQuery={query} onSearch={handleSearch} />

      {query && (
        <PaginationControls
          pageOffset={pageOffset}
          pageSize={pageSize}
          orderBy={orderBy}
          sortDirection={sortDirection}
          onPaginationChange={handlePaginationChange}
        />
      )}

      <div className="mt-8">
        {isLoading && (
          <div className={`grid ${getGridCols()} gap-4`}>
            {Array.from({ length: pageSize }).map((_, i) => (
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
            <p className="text-muted-foreground">{error instanceof Error ? error.message : "Failed to load movies"}</p>
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {data.Search.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">No movies found</h2>
                <p className="text-muted-foreground">
                  {query
                    ? `No results for "${query}". Try a different search term.`
                    : "Start searching to discover movies"}
                </p>
              </div>
            ) : (
              <>
                <MovieGrid movies={data.Search} pageSize={pageSize} />
                {data.totalResults && Number(data.totalResults) > pageSize && (
                  <Pagination
                    currentPage={pageOffset}
                    totalPages={Math.ceil(Number(data.totalResults) / pageSize)}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
