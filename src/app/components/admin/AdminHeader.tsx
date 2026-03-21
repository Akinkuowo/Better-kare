'use client'

import { LogOut, Menu } from 'lucide-react'
import Link from 'next/link'

interface AdminHeaderProps {
    onMenuClick: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 flex items-center px-6 lg:px-12 justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-gray-400 hover:text-gray-900 lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] hidden sm:block">Management Portal</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <Link 
                    href="/api/auth/signout"
                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-rose-600 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                </Link>
            </div>
        </header>
    )
}
