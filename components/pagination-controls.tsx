"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaginationControlsProps {
  pageOffset: number
  pageSize: number
  orderBy: string
  sortDirection: string
  onPaginationChange: (params: {
    pageOffset: number
    pageSize: number
    orderBy: string
    sortDirection: string
  }) => void
}

export function PaginationControls({
  pageOffset,
  pageSize,
  orderBy,
  sortDirection,
  onPaginationChange,
}: PaginationControlsProps) {
  const handlePageSizeChange = (value: string) => {
    onPaginationChange({
      pageOffset: 1, // Reset to first page when changing page size
      pageSize: parseInt(value, 10),
      orderBy: orderBy,
      sortDirection: sortDirection,
    })
  }

  const handleOrderByChange = (value: string) => {
    onPaginationChange({
      pageOffset: 1, // Reset to first page when changing sort order
      pageSize: pageSize,
      orderBy: value,
      sortDirection: sortDirection,
    })
  }

  const handleSortDirectionChange = (value: string) => {
    onPaginationChange({
      pageOffset: 1, // Reset to first page when changing sort direction
      pageSize: pageSize,
      orderBy: orderBy,
      sortDirection: value,
    })
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Pagination & Sorting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Page Size */}
          <div className="space-y-2">
            <Label htmlFor="page-size">Results per page</Label>
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select page size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Order By */}
          <div className="space-y-2">
            <Label htmlFor="order-by">Sort by</Label>
            <Select value={orderBy} onValueChange={handleOrderByChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Title">Title</SelectItem>
                <SelectItem value="Year">Year</SelectItem>
                <SelectItem value="imdbID">IMDb ID</SelectItem>
                <SelectItem value="Type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Direction */}
          <div className="space-y-2">
            <Label htmlFor="sort-direction">Sort direction</Label>
            <Select value={sortDirection} onValueChange={handleSortDirectionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascending">Ascending</SelectItem>
                <SelectItem value="descending">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
