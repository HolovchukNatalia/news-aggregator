import { sanityClient } from '@/lib/sanity'
import { SanitySource, SanityTopic } from '@/types'

// Fetch all enabled sources from Sanity
export const fetchSources = async (): Promise<SanitySource[]> => {
  const query = `*[_type == "source" && isEnabled == true] | order(name asc)`
  return sanityClient.fetch(query)
}

// Fetch all topics with their keywords from Sanity
export const fetchTopics = async (): Promise<SanityTopic[]> => {
  const query = `*[_type == "topic"] | order(name asc)`
  return sanityClient.fetch(query)
}

// Helper function to match article title with topics
export const matchTopicToArticle = (
  title: string,
  topics: SanityTopic[]
): SanityTopic | undefined => {
  const titleLower = title.toLowerCase()

  // Find the first topic where any keyword matches the title
  return topics.find(topic =>
    topic.keywords.some(keyword => titleLower.includes(keyword.toLowerCase()))
  )
}
