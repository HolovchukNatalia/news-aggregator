import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity configuration. Please check your .env file.'
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster responses
})
