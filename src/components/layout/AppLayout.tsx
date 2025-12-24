import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { LeftSidebar } from './LeftSidebar'
import { RightTOC } from './RightTOC'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl mx-auto p-6">
            <Outlet />
          </div>
        </main>

        <RightTOC />
      </div>
    </div>
  )
}
