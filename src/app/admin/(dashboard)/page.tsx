import { prisma } from "@/app/lib/db"
import Link from "next/link"
import { LayoutDashboard, ShoppingBag, FolderTree, ClipboardList, TrendingUp, Users, DollarSign } from "lucide-react"

export default async function AdminDashboardPage() {
    const [productCount, categoryCount, orderCount, recentOrders] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.order.count(),
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { items: true }
        })
    ])

    const totalSales = recentOrders.reduce((acc, order) => acc + order.total, 0) // Just from recent for now as demo

    const stats = [
        { name: 'Total Products', value: productCount, icon: ShoppingBag, color: 'bg-blue-500' },
        { name: 'Categories', value: categoryCount, icon: FolderTree, color: 'bg-indigo-500' },
        { name: 'Total Orders', value: orderCount, icon: ClipboardList, color: 'bg-emerald-500' },
        { name: 'Recent Revenue', value: `$${totalSales.toFixed(2)}`, icon: DollarSign, color: 'bg-amber-500' },
    ]

    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h2>
                <p className="text-gray-500 font-medium">Welcome back, administrator. Here's what's happening with BetterKare today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all group">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-${stat.color.split('-')[1]}-100 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.name}</div>
                        <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-500" />
                            Recent Orders
                        </h3>
                        <Link href="/admin/orders" className="text-indigo-600 text-sm font-bold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                                        ID
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">{order.name}</div>
                                        <div className="text-xs text-gray-400">{order.items.length} items • ${order.total.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                    }`}>
                                    {order.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200 p-8 text-white relative overflow-hidden group">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
                            <p className="text-indigo-100 text-sm mb-8">Instantly manage your store's most important assets.</p>
                            <div className="space-y-3">
                                <Link
                                    href="/admin/products/new"
                                    className="block w-full py-4 text-center bg-white text-indigo-600 font-bold rounded-2xl hover:scale-[1.02] transition-transform shadow-lg"
                                >
                                    Add New Product
                                </Link>
                                <Link
                                    href="/admin/categories/new"
                                    className="block w-full py-4 text-center bg-indigo-500/50 text-white font-bold rounded-2xl border border-indigo-400 hover:bg-indigo-500 transition-colors"
                                >
                                    Create Category
                                </Link>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-indigo-500/50 text-xs text-indigo-200 font-medium">
                            System Version 1.0.4 - Premium Admin
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform"></div>
                </div>
            </div>
        </div>
    )
}
