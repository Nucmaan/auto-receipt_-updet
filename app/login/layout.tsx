import '../globals.css'
import { AuthProvider } from "../context/AuthContext"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  )
} 