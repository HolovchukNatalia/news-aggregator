import { useParams, useNavigate } from 'react-router-dom'
import { useNews, useTopics } from '@/hooks/useNews'
import { matchTopicToArticle } from '@/services/sanity.service'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import { LoadingState, ErrorState } from '@/components/news/NewsStates'
import { useMemo } from 'react'

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Fetch all news to find the article by URL-encoded ID
  const { data, isLoading, error } = useNews()
  const { data: topics } = useTopics()

  // Flatten all pages to find article
  const article = useMemo(() => {
    if (!data?.pages || !id) return null
    
    const decodedId = decodeURIComponent(id)
    const allArticles = data.pages.flatMap(page => page.articles || [])
    return allArticles.find((article) => article.url === decodedId)
  }, [data, id])

  // Get topic for article
  const topic = useMemo(() => {
    if (!article || !topics) return null
    return matchTopicToArticle(article.title, topics)
  }, [article, topics])

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={(error as Error).message} />
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News Feed
          </Button>
        </Card>
      </div>
    )
  }

  const formattedDate = format(new Date(article.publishedAt), 'MMMM dd, yyyy • HH:mm')

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to News Feed
      </Button>

      {/* Article Card */}
      <Card className="overflow-hidden">
        {/* Featured Image */}
        {article.urlToImage && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}

        <div className="p-8">
          {/* Badges */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <Badge variant="outline">{article.source.name}</Badge>
            {topic && (
              <Badge
                style={{
                  backgroundColor: topic.color || undefined,
                }}
              >
                {topic.name}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </div>
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {article.author}
              </div>
            )}
          </div>

          {/* Description */}
          {article.description && (
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {article.description}
            </p>
          )}

          {/* Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="leading-relaxed">{article.content}</p>
            </div>
          )}

          {/* Read Full Article Button */}
          <div className="border-t pt-6">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => window.open(article.url, '_blank')}
            >
              Read Full Article
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              This article is hosted on {article.source.name}. Click the button
              above to read the complete story.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
