import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { fetchNews } from '@/services/news.service'
import { fetchSources, fetchTopics } from '@/services/sanity.service'
import { NewsFilters } from '@/types'

// Hook to fetch news articles with infinite scroll
export const useNews = (filters: NewsFilters = {}) => {
  return useInfiniteQuery({
    queryKey: ['news', filters],
    queryFn: ({ pageParam = 1 }) => fetchNews(filters, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // News API has max 100 results per query, so max ~5 pages with pageSize=20
      const totalPages = Math.min(Math.ceil(lastPage.totalResults / 20), 5)
      const currentPage = allPages.length
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
  })
}

// Hook to fetch allowed sources from Sanity
export const useSources = () => {
  return useQuery({
    queryKey: ['sources'],
    queryFn: fetchSources,
  })
}

// Hook to fetch topics from Sanity
export const useTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: fetchTopics,
  })
}
