import { Search, Filter, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SanitySource } from '@/types'

interface NewsFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedSource: string
  onSourceChange: (value: string) => void
  sources: SanitySource[]
  sortBy: 'publishedAt' | 'relevancy'
  onSortChange: (value: 'publishedAt' | 'relevancy') => void
  isSearching?: boolean
}

export const NewsFilters = ({
  searchQuery,
  onSearchChange,
  selectedSource,
  onSourceChange,
  sources,
  sortBy,
  onSortChange,
  isSearching = false,
}: NewsFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        {isSearching ? (
          <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10"
        />
        {isSearching && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground animate-pulse">
            Typing...
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter by Source
          </label>
          <select
            value={selectedSource}
            onChange={e => onSourceChange(e.target.value)}
            className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Sources</option>
            {sources.map(source => (
              <option key={source._id} value={source.identifier}>
                {source.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'publishedAt' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange('publishedAt')}
            >
              Latest
            </Button>
            <Button
              variant={sortBy === 'relevancy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange('relevancy')}
            >
              Relevancy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
