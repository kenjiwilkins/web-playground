# Web Development Playground

An interactive educational platform for learning and experimenting with HTML, CSS, JavaScript, and modern Web APIs. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Interactive Demos**: Hands-on demonstrations of web technologies
- **Web API Playground**: Live examples of modern browser APIs
  - Fetch API
  - Background Sync API
  - Background Tasks API (requestIdleCallback)
  - Badging API (PWA badges)
- **Progressive Web App**: Installable with offline support
- **Responsive Design**: Mobile-first 3-column layout
- **Dark Mode**: Full dark mode support
- **Type-Safe**: Built with TypeScript
- **Fast**: Powered by Vite with Rolldown

## Tech Stack

- **React 19** - UI library with latest features
- **TypeScript** - Type safety and better DX
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, pnpm, or Bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/web-playground.git

# Navigate to project directory
cd web-playground

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Other Commands

```bash
# Run linter
npm run lint
```

## Project Structure

```
src/
├── pages/              # Page components (lazy-loaded)
│   ├── Home.tsx
│   ├── html/          # HTML tutorials
│   ├── css/           # CSS tutorials
│   ├── javascript/    # JavaScript tutorials
│   └── webapi/        # Web API demos
├── components/
│   ├── layout/        # Layout components
│   ├── ui/            # Reusable UI components (shadcn/ui)
│   └── demos/         # Interactive demo components
├── config/
│   └── routes.tsx     # Route configuration
└── lib/               # Utility functions
```

## PWA Features

This app is a Progressive Web App with:
- **Service Worker**: Offline caching for better performance
- **Web App Manifest**: Installable on desktop and mobile
- **Background Sync**: Sync data when connection is restored
- **App Badging**: Show notification badges on app icon

### Installing as PWA

1. Open the app in a supported browser (Chrome, Edge, etc.)
2. Look for the install prompt or click the install icon in the address bar
3. Click "Install" to add it to your home screen or desktop

## Contributing

See [claude.md](./claude.md) for detailed development guidelines, architecture decisions, and code patterns.

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

Examples:
- feat(badging): add PWA install button
- fix(routes): correct path for sync page
- docs: update README
```

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Edge, Safari)
- ES2022+ features required
- Some Web APIs may have limited browser support

## License

MIT

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Web APIs Documentation](https://developer.mozilla.org/en-US/docs/Web/API)

---

For detailed development information, see [claude.md](./claude.md)
