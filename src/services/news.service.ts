import { NewsResponse, NewsFilters } from '@/types'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

if (!API_KEY) {
  throw new Error('Missing News API key. Please check your .env file.')
}

// Blocked domains - Russian and propaganda sources
const BLOCKED_DOMAINS = [
  'rt.com',
  'russia-today.com',
  'sputniknews.com',
  'tass.com',
  'tass.ru',
  'ria.ru',
  'rbc.ru',
  'interfax.ru',
  'kremlin.ru',
  'iz.ru',
  'vedomosti.ru',
  'kommersant.ru',
  'gazeta.ru',
  'lenta.ru',
  'meduza.io', // Russian independent but based in Latvia
  // Add more if needed
]

// Check if URL is from blocked domain
const isBlockedSource = (url: string): boolean => {
  if (!url) return false

  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    return BLOCKED_DOMAINS.some(
      blocked => hostname === blocked || hostname.endsWith('.' + blocked)
    )
  } catch {
    return false
  }
}

export const fetchNews = async (
  filters: NewsFilters = {},
  page: number = 1
): Promise<NewsResponse> => {
  const { source, searchQuery, sortBy = 'publishedAt' } = filters

  // Determine which endpoint to use
  const useEverything = source || searchQuery
  const endpoint = useEverything ? 'everything' : 'top-headlines'

  // Build query parameters
  const params = new URLSearchParams({
    apiKey: API_KEY,
    pageSize: '20', // Smaller page size for pagination
    page: page.toString(),
  })

  if (useEverything) {
    // /everything endpoint
    params.append('sortBy', sortBy)
    params.append('language', 'en') // Only English articles

    if (source) {
      params.append('sources', source)
    }

    if (searchQuery) {
      params.append('q', searchQuery)
    }

    // If no filters, get general news
    if (!source && !searchQuery) {
      params.append('q', 'news') // Generic query
    }
  } else {
    // /top-headlines endpoint
    params.append('country', 'us')
  }

  const url = `${BASE_URL}/${endpoint}?${params.toString()}`

  // Debug logging - single line format
  console.log(
    `🔍 REQUEST → Page ${page} | Endpoint: ${endpoint} | Query: "${searchQuery || 'none'}" | Source: ${source || 'none'}`
  )

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch news')
  }

  const data = await response.json()

  // Filter out blocked sources
  const originalCount = data.articles?.length || 0
  if (data.articles) {
    data.articles = data.articles.filter((article: any) => {
      // Filter out articles with no title
      if (!article.title) {
        console.log(
          ` BLOCKED: Article with no title from ${article.source.name}`
        )
        return false
      }

      // Filter out blocked sources
      const blocked = isBlockedSource(article.url)
      if (blocked) {
        console.log(` BLOCKED: ${article.source.name} - ${article.url}`)
      }
      return !blocked
    })
  }

  const filteredCount = data.articles?.length || 0
  const blockedCount = originalCount - filteredCount

  console.log(
    `RESPONSE → Found ${data.totalResults} results, showing ${filteredCount} articles${blockedCount > 0 ? ` (blocked ${blockedCount} Russian sources)` : ''}`
  )
  if (data.articles?.[0]) {
    console.log(`First article: "${data.articles[0].title}"`)
  }

  return data
}
