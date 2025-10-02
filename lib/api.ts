import type { z } from "zod"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api"

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export async function fetchJSON<T>(path: string, options: RequestInit = {}, schema?: z.ZodSchema<T>): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new APIError(errorData.error || `Request failed with status ${response.status}`, response.status)
    }

    const data = await response.json()

    // Validate with Zod if schema provided
    if (schema) {
      const result = schema.safeParse(data)
      if (!result.success) {
        console.error("[v0] Validation error:", result.error)
        throw new APIError("Invalid response format from server")
      }
      return result.data
    }

    return data
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError(error instanceof Error ? error.message : "Network request failed")
  }
}
