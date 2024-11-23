// src/components/landing/Navigation.tsx
'use client';

import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        <Leaf className="w-8 h-8 text-emerald-500" />
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          DytoClick
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        {/* <Link href="#" className="text-gray-600 hover:text-emerald-500 transition-colors">Services</Link> */}
        <Link href="#" className="text-gray-600 hover:text-emerald-500 transition-colors">About</Link>
        {/* <Link href="#" className="text-gray-600 hover:text-emerald-500 transition-colors">Blog</Link> */}
        <Link href="#" className="text-gray-600 hover:text-emerald-500 transition-colors">Contact</Link>
      </div>
      <button onClick={() => router.push('/dashboard')}
      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow">
        Login
      </button>
    </nav>
  );
}