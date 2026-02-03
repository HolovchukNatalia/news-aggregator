import { Loader2, AlertCircle, Search, Newspaper } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-6">
        <Newspaper className="h-16 w-16 text-muted-foreground animate-pulse" />
        <div className="absolute inset-0 animate-ping opacity-25">
          <Newspaper className="h-16 w-16 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Loading News</h3>
      <p className="text-muted-foreground">Fetching the latest headlines...</p>
    </div>
  )
}

export const ErrorState = ({ message }: { message: string }) => {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-destructive">
            Something Went Wrong
          </h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-primary hover:underline font-medium"
          >
            Try refreshing the page
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export const EmptyState = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            We couldn't find any articles matching your search criteria. Try
            adjusting your filters or search query.
          </p>
          <div className="text-sm text-muted-foreground">
            <p className="mb-2 font-medium">💡 Tips:</p>
            <ul className="text-left max-w-xs mx-auto space-y-1">
              <li>• Try different keywords</li>
              <li>• Remove filters to see all news</li>
              <li>• Check your spelling</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
