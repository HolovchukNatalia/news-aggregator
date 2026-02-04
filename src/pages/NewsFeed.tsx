import { useState, useMemo, useEffect, useRef } from 'react'
import { useNews, useSources, useTopics } from '@/hooks/useNews'
import { useDebounce } from '@/hooks/useDebounce'
import { matchTopicToArticle } from '@/services/sanity.service'
import { ArticleCard } from '@/components/news/ArticleCard'
import { ArticlesLoadingSkeleton } from '@/components/news/ArticleCardSkeleton'
import { NewsFilters } from '@/components/news/NewsFilters'
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from '@/components/news/NewsStates'
import { ArticleWithTopic, NewsFilters as FilterType } from '@/types'
import { Loader2 } from 'lucide-react'

export const NewsFeed = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const [sortBy, setSortBy] = useState<'publishedAt' | 'relevancy'>(
    'publishedAt'
  )
  
  // Ref for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Auto-search with debounce (waits 800ms after typing stops)
  const debouncedSearchQuery = useDebounce(searchQuery, 800)

  // Build filters object
  const filters: FilterType = {
    source: selectedSource || undefined,
    searchQuery: debouncedSearchQuery || undefined,
    sortBy,
  }

  // Fetch data with infinite query
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useNews(filters)
  
  const { data: sources, isLoading: sourcesLoading } = useSources()
  const { data: topics } = useTopics()

  // Flatten all pages into single array
  const allArticles = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap(page => page.articles || [])
  }, [data])

  // Enhance articles with topics
  const articlesWithTopics: ArticleWithTopic[] = useMemo(() => {
    if (!allArticles || !topics) return []

    return allArticles.map((article) => ({
      ...article,
      topic: matchTopicToArticle(article.title, topics),
    }))
  }, [allArticles, topics])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('📜 Loading more articles...')
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Check if search is in progress
  const isSearching = searchQuery !== debouncedSearchQuery

  // Initial loading state (only for first load)
  if (sourcesLoading) {
    return <LoadingState />
  }

  // Error state
  if (error) {
    return <ErrorState message={(error as Error).message} />
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="border-t-2 border-b-2 border-double border-border py-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight uppercase">
            Latest Headlines
          </h1>
        </div>
        <p className="text-sm font-body text-muted-foreground italic max-w-2xl mx-auto">
          "Stay informed with verified news from the world's most trusted sources"
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-accent">
          <span className="px-3 py-1 border border-destructive/50 text-destructive uppercase tracking-wider">
            🚫 Propaganda Blocked
          </span>
          <span className="text-muted-foreground">🇺🇦</span>
        </div>
      </div>

      <NewsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSource={selectedSource}
        onSourceChange={setSelectedSource}
        sources={sources || []}
        sortBy={sortBy}
        onSortChange={setSortBy}
        isSearching={isSearching}
      />

      {/* Show current search query for debugging */}
      {debouncedSearchQuery && (
        <div className="mb-4 text-sm text-muted-foreground bg-muted p-3 rounded-md">
          🔍 Searching for: "<strong>{debouncedSearchQuery}</strong>"
        </div>
      )}

      {isLoading ? (
        // Show skeleton while loading first page
        <ArticlesLoadingSkeleton />
      ) : articlesWithTopics.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            {articlesWithTopics.length} articles • Scroll for more
          </div>
          
          {/* Grid layout like original */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesWithTopics.map((article, index) => (
              <ArticleCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>

          {/* Load more trigger */}
          {hasNextPage && (
            <div 
              ref={loadMoreRef} 
              className="flex justify-center items-center py-8 mt-8 border-t border-border"
            >
              {isFetchingNextPage ? (
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm font-body text-muted-foreground">Loading more articles...</p>
                </div>
              ) : (
                <p className="text-sm font-body italic text-muted-foreground">
                  Scroll down for more news
                </p>
              )}
            </div>
          )}

          {/* End of results */}
          {!hasNextPage && articlesWithTopics.length > 0 && (
            <div className="text-center py-8 border-t-2 border-double border-border mt-8">
              <p className="text-sm font-body italic text-muted-foreground">
                ━━━ End of available articles ━━━
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
