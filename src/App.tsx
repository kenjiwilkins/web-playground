import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { getAllRoutes } from '@/config/routes'
import { Home } from '@/pages/Home'

function App() {
  const allRoutes = getAllRoutes()

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        {allRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                {route.component && <route.component />}
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
