import { lazy } from 'react'

export interface RouteConfig {
  path: string
  label: string
  icon?: string
  children?: RouteConfig[]
  component?: ReturnType<typeof lazy>
}

export const routes: RouteConfig[] = [
  {
    path: '/html',
    label: 'HTML',
    icon: 'FileCode',
    children: [
      {
        path: '/html/elements',
        label: 'Elements',
        component: lazy(() => import('@/pages/html/Elements')),
      },
    ],
  },
  {
    path: '/css',
    label: 'CSS',
    icon: 'Palette',
    children: [
      {
        path: '/css/flexbox',
        label: 'Flexbox',
        component: lazy(() => import('@/pages/css/Flexbox')),
      },
    ],
  },
  {
    path: '/javascript',
    label: 'JavaScript',
    icon: 'Code2',
    children: [
      {
        path: '/javascript/basics',
        label: 'Basics',
        component: lazy(() => import('@/pages/javascript/Basics')),
      },
    ],
  },
  {
    path: '/webapi',
    label: 'Web API',
    icon: 'Zap',
    children: [
      {
        path: '/webapi/fetch',
        label: 'Fetch API',
        component: lazy(() => import('@/pages/webapi/Fetch')),
      },
      {
        path: '/webapi/background-sync',
        label: 'Background Sync',
        component: lazy(() => import('@/pages/webapi/BackgroundSync')),
      },
      {
        path: '/webapi/background-tasks',
        label: 'Background Tasks',
        component: lazy(() => import('@/pages/webapi/BackgroundTasks')),
      },
      {
        path: '/webapi/badging',
        label: 'Badging API',
        component: lazy(() => import('@/pages/webapi/Badging')),
      },
      {
        path: '/webapi/battery',
        label: 'Battery Status API',
        component: lazy(() => import('@/pages/webapi/Battery')),
      },
      {
        path: '/webapi/beacon',
        label: 'Beacon API',
        component: lazy(() => import('@/pages/webapi/Beacon')),
      },
      {
        path: '/webapi/broadcast-channel',
        label: 'Broadcast Channel API',
        component: lazy(() => import('@/pages/webapi/BroadcastChannel')),
      },
      {
        path: '/webapi/custom-highlight',
        label: 'CSS Custom Highlight API',
        component: lazy(() => import('@/pages/css/CustomHighlight')),
      },
      {
        path: '/webapi/font-loading',
        label: 'CSS Font Loading API',
        component: lazy(() => import('@/pages/webapi/FontLoading')),
      },
      {
        path: '/webapi/painting-api',
        label: 'CSS Painting API',
        component: lazy(() => import('@/pages/webapi/PaintingAPI')),
      },
      {
        path: '/webapi/properties-values',
        label: 'CSS Properties and Values API',
        component: lazy(() => import('@/pages/webapi/PropertiesValues')),
      },
      {
        path: '/webapi/typed-om',
        label: 'CSS Typed OM API',
        component: lazy(() => import('@/pages/webapi/TypedOM')),
      },
    ],
  },
]

// Helper function to get current route children
export const getRouteChildren = (pathname: string): RouteConfig[] => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return []

  const topLevelPath = `/${segments[0]}`
  const route = routes.find(r => r.path === topLevelPath)
  return route?.children || []
}

// Helper to flatten all routes for router configuration
export const getAllRoutes = (): RouteConfig[] => {
  const allRoutes: RouteConfig[] = []
  routes.forEach(route => {
    if (route.children) {
      allRoutes.push(...route.children)
    }
  })
  return allRoutes
}
