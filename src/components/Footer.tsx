import { Github, Linkedin, Mail } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t mt-16 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3"> News Aggregator</h3>
            <p className="text-sm text-muted-foreground">
              Stay informed with the latest headlines from trusted sources.
              Powered by News API and Sanity CMS.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✓ Real-time news updates</li>
              <li>✓ Topic-based classification</li>
              <li>✓ Source filtering</li>
              <li>✓ Russian propaganda blocked 🇺🇦</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Built With</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• React + TypeScript</li>
              <li>• TailwindCSS + shadcn/ui</li>
              <li>• TanStack Query</li>
              <li>• Sanity CMS</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} News Aggregator. Created for Junior Frontend
            Developer position.
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
