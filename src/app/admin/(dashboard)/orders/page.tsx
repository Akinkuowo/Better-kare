import { prisma } from "@/app/lib/db"
import Image from "next/image"
import { format } from "date-fns"
import { OrderStatus } from "@prisma/client"
import { updateOrderStatus, deleteOrder } from "@/app/actions/order"
import { Trash2, Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react"
import { OrderActions } from "./OrderActions"

const statusIcons: Record<string, any> = {
    PENDING: Clock,
    PAID: CheckCircle,
    PROCESSING: Package,
    SHIPPED: Truck,
    DELIVERED: CheckCircle,
    CANCELLED: XCircle,
}

const statusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    PAID: "bg-emerald-100 text-emerald-700 border-emerald-200",
    PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
    SHIPPED: "bg-indigo-100 text-indigo-700 border-indigo-200",
    DELIVERED: "bg-purple-100 text-purple-700 border-purple-200",
    CANCELLED: "bg-gray-100 text-gray-700 border-gray-200",
}

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Orders</h2>

            <div className="space-y-6">
                {orders.map((order) => {
                    const Icon = statusIcons[order.status] || Clock

                    return (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-sm font-medium text-gray-400">Order ID:</span>
                                        <span className="text-sm font-mono font-semibold text-gray-700">{order.id}</span>
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">{order.name}</div>
                                    <div className="text-sm text-gray-500">{order.email} | {order.phone}</div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Total Amount</div>
                                        <div className="text-2xl font-black text-indigo-600">₦{order.total.toLocaleString()}</div>
                                    </div>

                                    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${statusColors[order.status]}`}>
                                        <Icon className="w-4 h-4" />
                                        <span className="font-bold text-sm uppercase">{order.status}</span>
                                    </div>

                                    <OrderActions orderId={order.id} currentStatus={order.status} />
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50/50">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Items Summary</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                                                {item.image && (
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-sm font-bold text-gray-800 truncate">{item.name}</div>
                                                <div className="text-xs text-gray-500">{item.quantity} x ₦{item.price.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div className="text-xs text-gray-400">
                                        Ordered on: {format(new Date(order.createdAt), "PPP p")}
                                    </div>
                                    <div className="text-xs font-medium text-indigo-600 italic">
                                        Ref: {order.paystackRef}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {orders.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No orders have been placed yet.</p>
                </div>
            )}
        </div>
    )
}
