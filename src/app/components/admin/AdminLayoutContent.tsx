'use client'

import { useState } from 'react'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import AdminHeader from '@/app/components/admin/AdminHeader'

interface AdminLayoutContentProps {
    session: any
    children: React.ReactNode
}

export default function AdminLayoutContent({ session, children }: AdminLayoutContentProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            <AdminSidebar 
                session={session} 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
            />

            <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}
