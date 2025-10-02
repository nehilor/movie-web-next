import { type NextRequest, NextResponse } from "next/server"

// Access the same favorites array from the parent route
// In a real app, this would be a database
let favorites: string[] = []

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ imdbID: string }> }) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))

  const { imdbID } = await params

  if (!imdbID) {
    return NextResponse.json({ error: "imdbID is required" }, { status: 400 })
  }

  // Remove from favorites
  favorites = favorites.filter((id) => id !== imdbID)

  return NextResponse.json({ success: true, imdbID })
}
