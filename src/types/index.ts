// News API Types
export interface NewsArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

// Sanity CMS Types
export interface SanitySource {
  _id: string
  _type: 'source'
  name: string
  identifier: string
  isEnabled: boolean
}

export interface SanityTopic {
  _id: string
  _type: 'topic'
  name: string
  keywords: string[]
  color?: string
}

// Enhanced Article with Topic
export interface ArticleWithTopic extends NewsArticle {
  topic?: SanityTopic
}

// Filters
export interface NewsFilters {
  source?: string
  searchQuery?: string
  sortBy?: 'publishedAt' | 'relevancy'
}
