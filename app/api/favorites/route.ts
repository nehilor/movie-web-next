import { type NextRequest, NextResponse } from "next/server"

// In-memory favorites store (resets on server restart)
const favorites: string[] = []

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))

  // Return full movie objects for favorites
  const MOCK_MOVIES = [
    {
      imdbID: "tt0468569",
      Title: "The Dark Knight",
      Year: "2008",
      Poster: "/dark-knight-poster.png",
    },
    {
      imdbID: "tt0137523",
      Title: "Fight Club",
      Year: "1999",
      Poster: "/fight-club-poster.png",
    },
    {
      imdbID: "tt0109830",
      Title: "Forrest Gump",
      Year: "1994",
      Poster: "/forrest-gump-poster.png",
    },
    {
      imdbID: "tt0816692",
      Title: "Interstellar",
      Year: "2014",
      Poster: "/interstellar-movie-poster.jpg",
    },
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster: "/inception-movie-poster.png",
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster: "/matrix-movie-poster.png",
    },
    {
      imdbID: "tt0110912",
      Title: "Pulp Fiction",
      Year: "1994",
      Poster: "/pulp-fiction-poster.png",
    },
    {
      imdbID: "tt0167260",
      Title: "The Lord of the Rings: The Return of the King",
      Year: "2003",
      Poster: "/lord-of-the-rings-return-of-the-king-poster.jpg",
    },
    {
      imdbID: "tt0120737",
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Year: "2001",
      Poster: "/lord-of-the-rings-fellowship-poster.jpg",
    },
    {
      imdbID: "tt0080684",
      Title: "Star Wars: Episode V - The Empire Strikes Back",
      Year: "1980",
      Poster: "/empire-strikes-back-poster.jpg",
    },
    {
      imdbID: "tt0073486",
      Title: "One Flew Over the Cuckoo's Nest",
      Year: "1975",
      Poster: "/one-flew-over-cuckoos-nest-poster.jpg",
    },
    {
      imdbID: "tt0099685",
      Title: "Goodfellas",
      Year: "1990",
      Poster: "/goodfellas-poster.png",
    },
    {
      imdbID: "tt0047478",
      Title: "Seven Samurai",
      Year: "1954",
      Poster: "/seven-samurai-poster.jpg",
    },
    {
      imdbID: "tt0114369",
      Title: "Se7en",
      Year: "1995",
      Poster: "/se7en-movie-poster.jpg",
    },
    {
      imdbID: "tt0317248",
      Title: "City of God",
      Year: "2002",
      Poster: "/city-of-god-poster.jpg",
    },
    {
      imdbID: "tt0076759",
      Title: "Star Wars: Episode IV - A New Hope",
      Year: "1977",
      Poster: "/star-wars-new-hope-poster.jpg",
    },
  ]

  const favoriteMovies = MOCK_MOVIES.filter((movie) => favorites.includes(movie.imdbID))

  return NextResponse.json(favoriteMovies)
}

export async function POST(request: NextRequest) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))

  const body = await request.json()
  const { imdbID } = body

  if (!imdbID) {
    return NextResponse.json({ error: "imdbID is required" }, { status: 400 })
  }

  // Add to favorites (idempotent)
  if (!favorites.includes(imdbID)) {
    favorites.push(imdbID)
  }

  return NextResponse.json({ success: true, imdbID })
}
