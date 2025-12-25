# Web Development Playground

## Project Overview

An interactive educational platform for learning and experimenting with HTML, CSS, JavaScript, and modern Web APIs. This project provides hands-on demonstrations with live code examples, focusing on making complex web technologies accessible through interactive demos.

**Target Audience**: Web developers learning modern web fundamentals and experimental Web APIs.

## Tech Stack

### Core
- **React 19.2.0** - UI framework with latest features
- **TypeScript 5.9.3** - Static type checking
- **Vite (Rolldown)** - Ultra-fast build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing

### UI & Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Pre-built component system (Button, Card, Sheet, ScrollArea)
- **CVA (Class Variance Authority)** - Component variant management

### Development
- **ESLint 9** - Code linting with React plugins
- **Bun** - Package manager (bun.lock present)
- **PostCSS + Autoprefixer** - CSS processing

### PWA Support
- Service Worker for offline capability
- Web App Manifest for installability
- Background Sync API integration

## Project Structure

```
src/
├── main.tsx                    # Entry point + service worker registration
├── App.tsx                     # Root component with routing
├── index.css                   # Global styles + Tailwind directives
│
├── config/
│   └── routes.tsx              # Centralized route configuration
│
├── pages/                      # Page components (lazy-loaded)
│   ├── Home.tsx                # Landing page
│   ├── html/
│   │   └── Elements.tsx
│   ├── css/
│   │   └── Flexbox.tsx
│   ├── javascript/
│   │   └── Basics.tsx
│   └── webapi/                 # Web API demonstrations
│       ├── Fetch.tsx
│       ├── BackgroundSync.tsx
│       ├── BackgroundTasks.tsx
│       └── Badging.tsx
│
├── components/
│   ├── layout/                 # Layout components
│   │   ├── AppLayout.tsx       # 3-column responsive layout
│   │   ├── TopNav.tsx          # Header navigation
│   │   ├── LeftSidebar.tsx     # Main navigation sidebar
│   │   ├── RightTOC.tsx        # Table of contents with scroll tracking
│   │   └── MobileSidebar.tsx   # Mobile navigation drawer
│   │
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── scroll-area.tsx
│   │   └── sheet.tsx
│   │
│   └── demos/                  # Interactive demo components
│       ├── BackgroundSyncDemo.tsx
│       ├── BackgroundTasksDemo.tsx
│       └── BadgingDemo.tsx
│
├── lib/
│   └── utils.ts                # Utility functions (cn for class merging)
│
└── types/
    └── background-sync.d.ts    # Custom TypeScript definitions

public/
├── manifest.json               # PWA manifest
└── sw.js                       # Service Worker
```

## Routing System

### Route Configuration

Routes are centrally managed in `src/config/routes.tsx`:

```typescript
interface RouteConfig {
  path: string
  label: string
  icon?: string              // Lucide icon name
  children?: RouteConfig[]
  component?: LazyComponent
}
```

**Key Features:**
- Hierarchical structure with parent/child relationships
- Lazy-loaded components for performance
- Icon support using Lucide React
- Helper functions: `getRouteChildren()`, `getAllRoutes()`

### Adding a New Page

1. **Create the page component** in appropriate category folder:
   ```tsx
   // src/pages/webapi/NewAPI.tsx
   export default function NewAPI() {
     return (
       <div className="space-y-6">
         <h1 className="text-3xl font-bold">New API</h1>
         {/* Content */}
       </div>
     )
   }
   ```

2. **Add route to `config/routes.tsx`**:
   ```typescript
   {
     path: '/webapi/new-api',
     label: 'New API',
     component: lazy(() => import('@/pages/webapi/NewAPI')),
   }
   ```

3. **Create demo component** (if needed) in `src/components/demos/`:
   ```tsx
   // src/components/demos/NewAPIDemo.tsx
   export function NewAPIDemo() {
     return <div>{/* Interactive demo */}</div>
   }
   ```

## Component Patterns

### Page Structure

All pages follow this consistent structure:

```tsx
export default function PageName() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Page Title
        </h1>
        <p className="text-muted-foreground">
          Brief description
        </p>
      </div>

      {/* Live Demo Section */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <DemoComponent />
      </section>

      {/* Documentation Sections */}
      <section>
        <h2 id="section-name" className="text-2xl font-semibold mb-4">
          Section Title
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Content */}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
```

**Important:** All section headings should have `id` attributes for Table of Contents linking.

### Demo Components

Demo components typically include:
- Feature detection/browser support check
- Interactive controls (buttons, inputs)
- Activity log showing operation results
- Clear visual feedback for state changes

Example pattern:
```tsx
export function APIDemo() {
  const [isSupported] = useState('apiName' in window)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error') => {
    setLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), message, type }, ...prev])
  }, [])

  return (
    <div className="space-y-4">
      {/* Browser support card */}
      {/* Demo controls */}
      {/* Activity log */}
    </div>
  )
}
```

## Styling Conventions

### Tailwind CSS

The project uses Tailwind with custom theme configuration:

**CSS Custom Properties** (defined in `index.css`):
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--primary`, `--primary-foreground`
- `--muted`, `--muted-foreground`
- `--border`, `--radius`

**Dark mode**: Supported via class-based toggling (`.dark` class)

### Common Utility Patterns

```tsx
// Spacing
className="space-y-4"        // Vertical spacing between children
className="gap-2"            // Gap in flex/grid layouts

// Cards
className="border-green-500"  // Success state
className="border-red-500"    // Error state
className="border-blue-500"   // Info state

// Layout
className="grid gap-4 md:grid-cols-2"  // Responsive grid

// Text
className="text-muted-foreground"  // Secondary text
className="text-sm"                // Small text
```

### Using the `cn()` Utility

For conditional classes, use the `cn()` utility from `@/lib/utils`:

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  variant === "primary" && "variant-classes"
)} />
```

## Common Tasks

### Adding a New Web API Demo

1. **Create the demo component** in `src/components/demos/`:
   ```tsx
   // APINameDemo.tsx
   import { useState } from 'react'
   import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

   export function APINameDemo() {
     const [isSupported] = useState('apiName' in navigator)
     // Demo logic
   }
   ```

2. **Create the page** in `src/pages/webapi/`:
   ```tsx
   // APIName.tsx
   import { APINameDemo } from '@/components/demos/APINameDemo'

   export default function APIName() {
     return (
       <div className="space-y-6">
         {/* Follow page structure pattern */}
       </div>
     )
   }
   ```

3. **Add TypeScript types** (if needed) in `src/types/`:
   ```typescript
   // api-name.d.ts
   interface CustomAPI {
     // API definitions
   }
   ```

4. **Register route** in `src/config/routes.tsx`

### Adding a shadcn/ui Component

1. **Create component file** in `src/components/ui/`:
   ```tsx
   // component-name.tsx
   import * as React from "react"
   import { cn } from "@/lib/utils"

   export function ComponentName({ className, ...props }) {
     return <div className={cn("base-styles", className)} {...props} />
   }
   ```

2. **Export from component** (if part of compound component pattern)

### Working with Service Worker

Service worker is registered in `src/main.tsx`:
- Handles offline caching
- Supports Background Sync API
- Cache strategy: Network first, fallback to cache

To modify caching behavior, edit `public/sw.js`.

## Development Workflow

### Running the Project

```bash
# Development (with HMR)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: React hooks rules enforced
- **Imports**: Use `@/` alias for src imports
- **Components**: Always use functional components with hooks
- **Props**: Prefer TypeScript interfaces over types for component props

### Performance Considerations

- All page routes are lazy-loaded
- Images should be optimized before adding
- Use `useMemo` and `useCallback` for expensive operations
- Keep bundle size small by avoiding large dependencies

### Git & Commit Guidelines

**Commit Message Format**: Use Conventional Commits specification

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Examples:**
```
feat(badging): add PWA install button to demo
fix(routes): correct path for background sync page
docs: update README with installation instructions
refactor(layout): simplify sidebar navigation logic
chore: update dependencies to latest versions
```

**Co-Authorship Policy:**
- **NEVER** include Claude Code co-author attribution in commits
- Commits should only be attributed to the actual human developer
- Do not add `Co-Authored-By: Claude Sonnet` or similar lines

## Architecture Decisions

### Why 3-Column Layout?
- **Left**: Main navigation (category browsing)
- **Center**: Content (focused reading area)
- **Right**: Table of Contents (section jumping)
- Mobile: Collapses to single column with drawer navigation

### Why Centralized Routes?
- Single source of truth for navigation
- Easy to add/remove pages
- Type-safe route configuration
- Automatic sidebar generation

### Why Lazy Loading?
- Faster initial page load
- Better code splitting
- Only load what's needed

### Why shadcn/ui?
- Accessible by default (Radix UI primitives)
- Customizable (copy-paste, not npm package)
- Full control over components
- Consistent design system

## Browser Support

Target browsers:
- Modern evergreen browsers (Chrome, Firefox, Edge, Safari)
- ES2022+ features
- PWA capabilities for supported browsers

**Note**: Web API demos may have limited browser support. Always include feature detection.

## Contributing Guidelines

When adding new content:

1. **Follow existing patterns** - Look at similar pages for structure
2. **Include live demos** - Interactive examples enhance learning
3. **Add proper TypeScript types** - No `any` unless absolutely necessary
4. **Test browser support** - Include feature detection
5. **Document thoroughly** - Explain concepts clearly with examples
6. **Mobile responsive** - Test on small screens
7. **Accessibility** - Use semantic HTML and ARIA when needed

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/config/routes.tsx` | Route configuration |
| `src/components/layout/AppLayout.tsx` | Main layout wrapper |
| `src/lib/utils.ts` | Utility functions |
| `tailwind.config.js` | Theme configuration |
| `vite.config.ts` | Build configuration |
| `public/manifest.json` | PWA manifest |
| `public/sw.js` | Service Worker |

## Environment

- **Node version**: Compatible with Bun runtime
- **Package manager**: Bun (can also use npm/pnpm)
- **Build target**: ES2022, modules
- **Module resolution**: Bundler (TypeScript)

## Notes for AI Assistants

- When adding pages, always update `src/config/routes.tsx`
- Follow the established page structure pattern for consistency
- Use existing UI components from `src/components/ui/`
- Include TypeScript types for Web APIs in `src/types/`
- Test PWA functionality after changes to service worker or manifest
- Keep the Table of Contents working by using `id` attributes on headings
- Mobile-first responsive design - test all breakpoints

### Commit Guidelines for AI
- **CRITICAL**: Use Conventional Commits format (e.g., `feat:`, `fix:`, `docs:`)
- **NEVER** add Claude Code or Claude Sonnet co-authorship to commits
- Commits should be attributed only to the human developer
- Keep commit messages concise and descriptive
- Use appropriate scope when relevant (e.g., `feat(badging):`, `fix(routes):`)
