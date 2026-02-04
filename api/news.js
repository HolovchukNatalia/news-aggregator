export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const { searchParams } = new URL(req.url, `https://${req.headers.host}`)

    const endpoint = searchParams.get('endpoint') || 'top-headlines'
    searchParams.delete('endpoint')

    const newsApiUrl = `https://newsapi.org/v2/${endpoint}`
    const newsApiParams = new URLSearchParams(searchParams)

    const response = await fetch(`${newsApiUrl}?${newsApiParams.toString()}`)
    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    console.error('News API proxy error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch news',
    })
  }
}
