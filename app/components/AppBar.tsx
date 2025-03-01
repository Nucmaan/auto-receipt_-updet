'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function AppBar() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <div className="h-12 border-b border-gray-200 bg-white px-4 flex items-center">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1
          const formattedPath = path.charAt(0).toUpperCase() + path.slice(1)
          
          return (
            <motion.div 
              key={path}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={isLast ? 'font-medium text-gray-900' : ''}>
                {formattedPath}
              </span>
              {!isLast && <ChevronRight className="h-4 w-4 mx-1" />}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

