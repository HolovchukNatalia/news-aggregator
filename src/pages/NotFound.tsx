import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="p-12 text-center max-w-md">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')}>
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Card>
    </div>
  )
}
