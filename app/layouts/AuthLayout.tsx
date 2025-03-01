'use client'

import Sidebar from "@/app/components/Sidebar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
} 