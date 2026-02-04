import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NewsFeed } from '@/pages/NewsFeed'
import { ArticleDetail } from '@/pages/ArticleDetail'
import { NotFound } from '@/pages/NotFound'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <div className="min-h-screen bg-background flex flex-col">
          <header className="border-b-4 border-double border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center border-b-2 border-border pb-4 mb-2">
                <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tight uppercase">
                  The Daily Chronicle
                </h1>
                <p className="text-xs font-accent tracking-widest mt-2 text-muted-foreground uppercase">
                  Est. 2025 • All The News Worth Reading
                </p>
              </div>
              <div className="text-center text-xs font-body text-muted-foreground">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8 flex-1">
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
