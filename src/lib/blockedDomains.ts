// Blocked domains - Russian propaganda and disinformation sources
// This list blocks Russian state media and propaganda outlets

export const BLOCKED_DOMAINS = [
  // Russian state media
  'rt.com',
  'russia-today.com',
  'sputniknews.com',
  'sputnik.com',
  'tass.com',
  'ria.ru',
  'rianovosti.ru',
  'itar-tass.com',
  
  // Russian propaganda outlets
  'kremlin.ru',
  'mid.ru',
  'rvvoenkory.ru',
  
  // Add more as needed
]

export const isBlockedDomain = (url: string): boolean => {
  if (!url) return false
  
  try {
    const domain = new URL(url).hostname.toLowerCase()
    
    // Check exact match or subdomain
    return BLOCKED_DOMAINS.some(blocked => 
      domain === blocked || domain.endsWith('.' + blocked)
    )
  } catch {
    return false
  }
}

export const filterBlockedArticles = <T extends { url: string; title?: string }>(
  articles: T[]
): T[] => {
  const blockedArticles: { url: string; title?: string }[] = []
  const filtered = articles.filter(article => {
    const isBlocked = isBlockedDomain(article.url)
    if (isBlocked) {
      blockedArticles.push(article)
    }
    return !isBlocked
  })
  
  if (blockedArticles.length > 0) {
    console.log(`🚫 Blocked ${blockedArticles.length} Russian propaganda articles:`)
    blockedArticles.forEach(article => {
      const domain = new URL(article.url).hostname
      console.log(`  • ${domain}: ${article.title?.substring(0, 60) || 'No title'}...`)
    })
  }
  
  return filtered
}
