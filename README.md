# News Aggregator

A modern, responsive news aggregator built with React, TypeScript, and Sanity CMS. Features vintage newspaper styling, infinite scroll, and real-time content filtering.

![News Aggregator](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue)

## Features

- **Real-time News Feed** - Fetches latest articles from News API
- **Infinite Scroll** - Automatically loads more articles as you scroll
- **Advanced Filtering** - Filter by source, search by keyword
- **Topic Classification** - Automatically categorizes articles by topics
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Vintage Newspaper Style** - Authentic newspaper aesthetic with serif fonts
- **Content Moderation** - Blocks propaganda sources 🇺🇦
- **SEO Optimized** - Meta tags and semantic HTML

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Data fetching & caching
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **Sanity CMS** - Content management
- **News API** - News data source
- **React Router** - Navigation

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- News API key (free from [newsapi.org](https://newsapi.org))
- Sanity account (free from [sanity.io](https://sanity.io))

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/HolovchukNatalia/news-aggregator.git
cd news-aggregator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

#### Getting API Keys:

**News API:**

1. Go to [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for free account
4. Copy your API key

**Sanity:**

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create new project or use existing
3. Copy Project ID from project settings
4. Use dataset: `production`

#### Add Sample Data:

**Sources:**

- BBC News (identifier: `bbc-news`)
- CNN (identifier: `cnn`)
- TechCrunch (identifier: `techcrunch`)
- The Verge (identifier: `the-verge`)

**Topics:**

- Technology (keywords: `AI`, `tech`, `software`, `Apple`, `Google`)
- Politics (keywords: `election`, `government`, `president`, `politics`)
- Business (keywords: `economy`, `market`, `stock`, `business`)
- Sports (keywords: `sports`, `football`, `basketball`, `championship`)

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features in Detail

### Infinite Scroll

- Automatically loads 20 articles at a time
- Uses Intersection Observer API
- Smooth loading indicators
- Up to 5 pages (100 articles total)

### Content Filtering

- **By Source**: Dropdown filter for news sources
- **By Keyword**: Real-time search with 800ms debounce
- **By Topic**: Automatic categorization from Sanity CMS

### Topic Classification

Topics are dynamically loaded from Sanity CMS and matched against article titles using keywords. No hardcoded logic!

### Russian Propaganda Blocking 🇺🇦

Automatically filters out 15+ Russian propaganda sources including RT, Sputnik, TASS, and others.

### Vintage Newspaper Design

- **Fonts**: Playfair Display (headlines), Merriweather (body)
- **Colors**: Cream background, vintage orange accents
- **Layout**: Classic newspaper grid
- **Typography**: Serif fonts, proper line heights

## 🧪 Testing

```bash
npm run lint

npm run type-check
```

## Configuration

### News API

- Free tier: 100 requests/day
- Endpoint: `/v2/everything` or `/v2/top-headlines`
- Parameters: `q`, `sources`, `sortBy`, `page`, `pageSize`

### Sanity CMS

- Real-time updates
- GROQ query language
- CDN-backed content delivery

## Author

**Natalia Holovchuk**

- GitHub: [@HolovchukNatalia](https://github.com/HolovchukNatalia)
- LinkedIn: [Natalia Holovchuk](https://www.linkedin.com/in/nataliaholovchuk/)
- Email: holovshyk@gmail.com

## Acknowledgments

- [News API](https://newsapi.org) - News data
- [Sanity](https://sanity.io) - Content management
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [TanStack Query](https://tanstack.com/query) - Data fetching

---

Made with ❤️ by Natalia Holovchuk
