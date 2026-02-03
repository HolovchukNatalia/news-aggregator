import { format } from 'date-fns'
import { Calendar, ExternalLink, ImageIcon } from 'lucide-react'
import { ArticleWithTopic } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ArticleCardProps {
  article: ArticleWithTopic
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const {
    title,
    description,
    source,
    publishedAt,
    urlToImage,
    url,
    topic,
  } = article

  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const formattedDate = format(new Date(publishedAt), 'MMM dd, yyyy')

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
    // Suppress console errors
    console.debug('Image failed to load (CORS or invalid URL):', urlToImage)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleViewDetails = () => {
    // Navigate to article detail page with encoded URL as ID
    navigate(`/article/${encodeURIComponent(url)}`)
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      {urlToImage && !imageError ? (
        <div 
          className="w-full h-48 overflow-hidden rounded-t-lg relative bg-muted cursor-pointer"
          onClick={handleViewDetails}
        >
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">
                <ImageIcon className="h-8 w-8" />
              </div>
            </div>
          )}
          <img
            src={urlToImage}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 hover:opacity-90 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </div>
      ) : (
        <div 
          className="w-full h-48 bg-muted flex flex-col items-center justify-center rounded-t-lg text-muted-foreground cursor-pointer hover:bg-muted/80"
          onClick={handleViewDetails}
        >
          <ImageIcon className="h-12 w-12 mb-2" />
          <span className="text-sm">No image available</span>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-2">
            {topic && (
              <Badge
                style={{
                  backgroundColor: topic.color || undefined,
                }}
              >
                {topic.name}
              </Badge>
            )}
            <Badge variant="outline">{source.name}</Badge>
          </div>
        </div>
        <CardTitle 
          className="line-clamp-2 cursor-pointer hover:text-primary font-headline font-bold text-xl leading-tight"
          onClick={handleViewDetails}
        >
          {title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description || 'No description available.'}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(url, '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
