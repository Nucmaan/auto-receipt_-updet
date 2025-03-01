'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Facebook, Twitter, Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { user, setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Accept any email/password combination
      setUser({
        id: '1',
        name: 'Admin User',
        email: formData.email,
        role: 'admin',
        department: 'IT',
        designation: 'System Administrator',
        avatar: 'logo.png',
        coverImage: 'login.jpeg'
      })

      // Use router.replace instead of window.location
      router.replace('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Using direct image */}
      <div className="relative hidden md:block">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/login.jpeg')",
          }}
        />
        
        {/* Orange overlay with exact color */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: '#ff4e00',
            opacity: '0.85',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Content container */}
        <div className="relative h-full flex flex-col items-start justify-center px-16 py-12">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-[3.5rem] leading-tight font-bold text-white">
              Welcome to Astaan
            </h1>
            <h2 className="text-2xl text-white/90">
              Your Complete Auto Receipt Management System
            </h2>
            <div className="mt-12">
              <p className="text-xl text-white/90 bg-black/30 backdrop-blur-sm rounded-xl p-6">
                Streamline your operations with our powerful management tools
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-16">
            <p className="text-white/70 text-sm">
              © 2025 Astaan. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Updated Logo with exact sizing */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-[24px] border-2 border-[#ff4e00]">
              <img
                src="/logo.png"
                alt="Astaan Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>

          {/* Updated Welcome Text */}
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-[28px] font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 text-base">Please enter your details to sign in</p>
          </div>

          {/* Updated Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-[15px] font-medium text-gray-900 mb-2">
                  Email address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user1@example.com"
                  className="w-full h-12 px-4 bg-[#F3F6FF] border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[15px] font-medium text-gray-900 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full h-12 px-4 bg-[#F3F6FF] border-0 rounded-lg text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-[#ff4e00] hover:text-[#e64600] text-sm font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#ff4e00] hover:bg-[#e64600] text-white rounded-lg font-medium text-base"
            >
              Sign in
            </Button>

            {/* Updated Social Links Section */}
            <div className="pt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Get in touch with us
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-6">
                <Link 
                  href="#"
                  className="w-[120px] h-12 flex items-center justify-center rounded-lg border border-gray-200 hover:border-[#1877F2] transition-colors"
                >
                  <Facebook className="h-6 w-6 text-[#1877F2]" />
                </Link>
                <Link 
                  href="#"
                  className="w-[120px] h-12 flex items-center justify-center rounded-lg border border-gray-200 hover:border-[#1DA1F2] transition-colors"
                >
                  <Twitter className="h-6 w-6 text-[#1DA1F2]" />
                </Link>
                <Link 
                  href="#"
                  className="w-[120px] h-12 flex items-center justify-center rounded-lg border border-gray-200 hover:border-[#EA4335] transition-colors"
                >
                  <Mail className="h-6 w-6 text-[#EA4335]" />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

