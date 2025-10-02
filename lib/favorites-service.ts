import type { MovieSummary } from "@/lib/types"

// Constants for localStorage keys
const FAVORITES_STORAGE_KEY = 'movie-favorites'

// Types
export interface FavoritesService {
  getFavorites(): MovieSummary[]
  addFavorite(movie: MovieSummary): void
  removeFavorite(imdbID: string): void
  isFavorite(imdbID: string): boolean
  clearFavorites(): void
}

// Validation functions
const isValidMovie = (movie: any): movie is MovieSummary => {
  return (
    movie &&
    typeof movie === 'object' &&
    typeof movie.imdbID === 'string' &&
    typeof movie.Title === 'string' &&
    typeof movie.Year === 'string' &&
    typeof movie.Type === 'string' &&
    typeof movie.Poster === 'string'
  )
}

const isValidImdbID = (imdbID: any): imdbID is string => {
  return typeof imdbID === 'string' && imdbID.length > 0
}

// LocalStorage utilities
const getStoredFavorites = (): MovieSummary[] => {
  try {
    if (typeof window === 'undefined') return []

    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    // Filter out invalid entries
    return parsed.filter(isValidMovie)
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error)
    return []
  }
}

const setStoredFavorites = (favorites: MovieSummary[]): void => {
  try {
    if (typeof window === 'undefined') return

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error)
  }
}

// Service implementation
export const favoritesService: FavoritesService = {
  getFavorites(): MovieSummary[] {
    return getStoredFavorites()
  },

  addFavorite(movie: MovieSummary): void {
    if (!isValidMovie(movie)) {
      console.error('Invalid movie object:', movie)
      return
    }

    const favorites = getStoredFavorites()

    // Check if already exists
    if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
      console.warn('Movie already in favorites:', movie.imdbID)
      return
    }

    // Add to favorites
    const updatedFavorites = [...favorites, movie]
    setStoredFavorites(updatedFavorites)
  },

  removeFavorite(imdbID: string): void {
    if (!isValidImdbID(imdbID)) {
      console.error('Invalid imdbID:', imdbID)
      return
    }

    const favorites = getStoredFavorites()
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== imdbID)
    setStoredFavorites(updatedFavorites)
  },

  isFavorite(imdbID: string): boolean {
    if (!isValidImdbID(imdbID)) {
      return false
    }

    const favorites = getStoredFavorites()
    return favorites.some(fav => fav.imdbID === imdbID)
  },

  clearFavorites(): void {
    setStoredFavorites([])
  }
}

// Custom hook for favorites
export const useFavorites = () => {
  const getFavorites = () => favoritesService.getFavorites()
  const addFavorite = (movie: MovieSummary) => favoritesService.addFavorite(movie)
  const removeFavorite = (imdbID: string) => favoritesService.removeFavorite(imdbID)
  const isFavorite = (imdbID: string) => favoritesService.isFavorite(imdbID)
  const clearFavorites = () => favoritesService.clearFavorites()

  return {
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites
  }
}
