import { NewsResponse, NewsFilters } from '@/types'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const IS_PRODUCTION = import.meta.env.PROD
const BASE_URL = IS_PRODUCTION ? '/api/news' : 'https://newsapi.org/v2'

if (!API_KEY) {
  throw new Error('Missing News API key. Please check your .env file.')
}

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
  'meduza.io',
]

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

  const useEverything = source || searchQuery
  const endpoint = useEverything ? 'everything' : 'top-headlines'

  const params = new URLSearchParams({
    apiKey: API_KEY,
    pageSize: '20',
    page: page.toString(),
  })

  if (useEverything) {
    params.append('sortBy', sortBy)
    params.append('language', 'en')

    if (source) {
      params.append('sources', source)
    }

    if (searchQuery) {
      params.append('q', searchQuery)
    }

    if (!source && !searchQuery) {
      params.append('q', 'news')
    }
  } else {
    params.append('country', 'us')
  }

  if (IS_PRODUCTION) {
    params.append('endpoint', endpoint)
  }

  const url = IS_PRODUCTION
    ? `${BASE_URL}?${params.toString()}`
    : `${BASE_URL}/${endpoint}?${params.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch news')
  }

  const data = await response.json()

  const originalCount = data.articles?.length || 0
  if (data.articles) {
    data.articles = data.articles.filter((article: any) => {
      if (!article.title) {
        return false
      }

      const blocked = isBlockedSource(article.url)
      if (blocked) {
        console.log(`BLOCKED: ${article.source.name} - ${article.url}`)
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
