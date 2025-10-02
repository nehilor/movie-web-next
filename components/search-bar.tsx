"use client"

import { useState, useEffect } from "react"
import { Input } from "./ui/input"

interface SearchBarProps {
  initialQuery: string
  onSearch: (query: string) => void
}

export function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialQuery)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, onSearch])

  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        type="search"
        placeholder="Search for movies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-12 h-12 text-base rounded-xl"
        aria-label="Search movies"
      />
    </div>
  )
}
