'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full px-6 py-4 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-4 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            © Copyright Edmate {new Date().getFullYear()}, All Right Reserved
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="/license"
            className="text-xs text-gray-500 hover:text-[#ff4e00] transition-colors"
          >
            License
          </Link>
          <Link
            href="/more-themes"
            className="text-xs text-gray-500 hover:text-[#ff4e00] transition-colors"
          >
            More Themes
          </Link>
          <Link
            href="/documentation"
            className="text-xs text-gray-500 hover:text-[#ff4e00] transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="/support"
            className="text-xs text-gray-500 hover:text-[#ff4e00] transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
} 