"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Sidebar from './Sidebar';
import Header from './Header';
import { Loading } from './Loading';
import { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#ff4e00]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
} 