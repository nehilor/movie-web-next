"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { MovieGrid } from "@/components/movie-grid"
import { Pagination } from "@/components/pagination"
import { useMoviesSearchQuery } from "@/lib/queries"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qParam = searchParams.get("q") || ""
  const pageParam = Number.parseInt(searchParams.get("page") || "1", 10)

  const [query, setQuery] = useState(qParam)
  const [page, setPage] = useState(pageParam)

  const { data, isLoading, isError, error } = useMoviesSearchQuery({
    q: query,
    page,
  })

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (page > 1) params.set("page", page.toString())
    router.replace(`/?${params.toString()}`, { scroll: false })
  }, [query, page, router])

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Search Movies</h1>
        <p className="text-muted-foreground text-lg">Find your favorite movies and add them to your collection</p>
      </div>

      <SearchBar initialQuery={query} onSearch={handleSearch} />

      <div className="mt-8">
        {isLoading && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
                <MovieGrid movies={data.Search} />
                {data.totalResults && Number(data.totalResults) > 10 && (
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(Number(data.totalResults) / 10)}
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
