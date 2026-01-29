import { NewsResponse, NewsFilters } from '@/types'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

if (!API_KEY) {
  throw new Error('Missing News API key. Please check your .env file.')
}

export const fetchNews = async (
  filters: NewsFilters = {}
): Promise<NewsResponse> => {
  const { source, searchQuery, sortBy = 'publishedAt' } = filters

  const params = new URLSearchParams({
    apiKey: API_KEY,
    sortBy,
    pageSize: '100',
  })

  if (source) {
    params.append('sources', source)
  } else {
    params.append('country', 'us')
  }

  if (searchQuery) {
    params.append('q', searchQuery)
  }

  const endpoint = source || searchQuery ? 'everything' : 'top-headlines'
  const url = `${BASE_URL}/${endpoint}?${params.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch news')
  }

  return response.json()
}
