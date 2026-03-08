import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import Link from "next/link"
import { LayoutDashboard, ShoppingBag, FolderTree, ClipboardList, LogOut } from "lucide-react"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: ShoppingBag },
        { name: 'Categories', href: '/admin/categories', icon: FolderTree },
        { name: 'Orders', href: '/admin/orders', icon: ClipboardList },
    ]

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 shadow-lg shadow-gray-100/20">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
                            BetterKare
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-1 mt-4">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all font-medium group"
                            >
                                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
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

            {/* Main Content */}
            <main className="flex-1 ml-72 overflow-y-auto">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 flex items-center px-12 justify-between">
                    <h1 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Management Portal</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
                            <LogOut className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </header>
                <div className="p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
