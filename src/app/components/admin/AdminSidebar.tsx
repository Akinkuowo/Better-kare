'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, FolderTree, ClipboardList, LogOut, X, Menu } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SidebarProps {
    session: any
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Orders', href: '/admin/orders', icon: ClipboardList },
]

export default function AdminSidebar({ session, isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname()

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsOpen(false)
    }, [pathname, setIsOpen])

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <aside className={cn(
                "w-72 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 lg:translate-x-0 overflow-y-auto",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-8 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
                            BetterKare
                        </span>
                    </Link>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-6 space-y-1 mt-4">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group",
                                    isActive 
                                        ? "text-indigo-600 bg-indigo-50/50" 
                                        : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50"
                                )}
                            >
                                <Icon className={cn(
                                    "w-5 h-5 transition-transform",
                                    isActive ? "scale-110" : "group-hover:scale-110"
                                )} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-6 border-t border-gray-50">
                    <div className="bg-indigo-50/50 rounded-2xl p-4 mb-4">
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Account</div>
                        <div className="text-sm font-bold text-gray-800 truncate">{session?.user?.name || session?.user?.email}</div>
                        <div className="text-[10px] text-indigo-500 font-black uppercase">Administrator</div>
                    </div>
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-medium group"
                    >
                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Sign Out
                    </Link>
                </div>
            </aside>
        </>
    )
}
