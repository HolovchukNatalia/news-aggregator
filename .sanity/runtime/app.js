import studioConfig from '..\\..\\sanity.config.ts'
import { renderStudio } from 'sanity'

renderStudio(document.getElementById('sanity'), studioConfig, {
  reactStrictMode: false,
  basePath: '/',
})
