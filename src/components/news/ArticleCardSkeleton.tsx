import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const ArticleCardSkeleton = () => {
  return (
    <Card className="flex flex-col h-full">
      <div className="w-full h-48 bg-muted animate-pulse rounded-t-lg" />

      <CardHeader>
        <div className="flex gap-2 mb-2">
          <div className="h-5 w-20 bg-muted animate-pulse rounded-full" />
          <div className="h-5 w-24 bg-muted animate-pulse rounded-full" />
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </div>

        <div className="h-3 w-32 bg-muted animate-pulse rounded mt-2" />
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="h-3 bg-muted animate-pulse rounded w-full" />
          <div className="h-3 bg-muted animate-pulse rounded w-full" />
          <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
        </div>
      </CardContent>

      <div className="p-6 pt-0">
        <div className="h-9 bg-muted animate-pulse rounded" />
      </div>
    </Card>
  )
}

export const ArticlesLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  )
}
