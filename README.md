# Mert's Desktop - Portfolio Website

A modern, performant portfolio website built with Astro, SolidJS, and Tailwind CSS. Features a complete portfolio showcase, blog posts, and an interactive mystery game.

🌐 **Live Site:** [mertsdesk.top](https://mertsdesk.top)

## ✨ Features

- 🎨 **Portfolio Showcase** - Display of professional work and projects
- 📝 **Blog Posts** - Technical articles and insights
- 🎮 **Interactive Mystery Game** - "Zehra is Missing" - A detective experience
- 🌍 **Bilingual Support** - English and Turkish (EN/TR)
- 🌙 **Dark Mode** - System-aware theme with manual toggle
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Fast Performance** - Static-first with selective hydration
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build) v5.16 - Static site generator
- **UI Library:** [SolidJS](https://www.solidjs.com) v1.9 - Reactive UI components
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v3 - Utility-first CSS
- **Package Manager:** [Bun](https://bun.sh) - Fast JavaScript runtime
- **Deployment:** [Vercel](https://vercel.com) - Serverless deployment
- **Analytics:** Vercel Analytics & Speed Insights
- **API Integration:** Google Sheets API for survey data

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── images/            # Project images and photos
│   ├── zehra/             # Game assets
│   └── theme.js           # Dark mode script
├── src/
│   ├── components/
│   │   ├── astro/         # Static Astro components
│   │   │   ├── Article.astro
│   │   │   ├── Banner.astro
│   │   │   ├── Footer.astro
│   │   │   └── ...
│   │   └── solid/         # Interactive SolidJS components
│   │       ├── Navbar.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── GameContent.tsx
│   │       └── ...
│   ├── contexts/          # SolidJS contexts
│   │   └── LanguageContext.tsx
│   ├── data/              # Game data and content
│   │   ├── zehraMessages.tsx
│   │   └── ...
│   ├── layouts/           # Page layouts
│   │   └── MainLayout.astro
│   ├── lib/               # Utilities and helpers
│   │   ├── google-sheets.ts
│   │   └── translations/
│   ├── pages/             # File-based routing
│   │   ├── index.astro    # Home page
│   │   ├── contact.astro  # Contact page
│   │   ├── posts.astro    # Blog posts
│   │   ├── works/         # Portfolio projects
│   │   ├── zehra/         # Mystery game
│   │   └── api/           # API endpoints
│   ├── styles/            # Global styles
│   │   └── global.css
│   └── types/             # TypeScript types
│       └── game.ts
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.3.6 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/utarit/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Google Sheets API credentials:
```env
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
```

4. Start the development server:
```bash
bun run dev
```

Visit [http://localhost:4321](http://localhost:4321) to see your site.

## 📜 Available Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server at `localhost:4321` |
| `bun run build` | Build production site to `./dist/` |
| `bun run preview` | Preview build locally before deploying |
| `bun run astro ...` | Run Astro CLI commands |

## 🎮 Zehra Mystery Game

An interactive detective game where players solve the mystery of Zehra's disappearance by:
- Unlocking 5 different phones with passwords
- Reading chat conversations
- Solving puzzles
- Collecting evidence
- Making final accusations

**Play the game:** [mertsdesk.top/zehra](https://mertsdesk.top/zehra)

## 🌍 Internationalization

The site supports English and Turkish languages:
- Language context using SolidJS
- Automatic language detection
- Manual language toggle
- Separate routes for Turkish content (`/tr`)

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom color scheme** with dark mode support
- **Responsive breakpoints** for mobile, tablet, and desktop
- **CSS transitions** for smooth interactions

## 📊 Performance

- **Static-first approach** - Most pages are pre-rendered
- **Selective hydration** - Only interactive components use JavaScript
- **Optimized images** - Automatic image optimization
- **Fast builds** - Bun for faster dependency installation and builds

## 🚢 Deployment

The site is deployed on Vercel with automatic deployments from the main branch.

### Build Configuration

```json
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install"
}
```

## 📝 License

This project is personal portfolio website. All rights reserved.

## 👤 Author

**Mert Akça**
- Website: [mertsdesk.top](https://mertsdesk.top)
- LinkedIn: [linkedin.com/in/mert-akca](https://linkedin.com/in/mert-akca)
- GitHub: [@utarit](https://github.com/utarit)

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- UI components with [SolidJS](https://www.solidjs.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide](https://lucide.dev)
- Deployed on [Vercel](https://vercel.com)

---

**Note:** This project was migrated from Next.js to Astro for better performance and developer experience. See [GAME_MIGRATION_STATUS.md](./GAME_MIGRATION_STATUS.md) for migration details.