'use client'

import { OrderStatus } from "@prisma/client"
import { updateOrderStatus, deleteOrder } from "@/app/actions/order"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useTransition } from "react"

interface OrderActionsProps {
    orderId: string
    currentStatus: OrderStatus
}

export function OrderActions({ orderId, currentStatus }: OrderActionsProps) {
    const [isPending, startTransition] = useTransition()

    const handleStatusChange = async (newStatus: OrderStatus) => {
        startTransition(async () => {
            try {
                await updateOrderStatus(orderId, newStatus)
                toast.success('Order status updated')
            } catch (error) {
                toast.error('Failed to update order status')
            }
        })
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this order?')) return

        startTransition(async () => {
            try {
                await deleteOrder(orderId)
                toast.success('Order deleted')
            } catch (error) {
                toast.error('Failed to delete order')
            }
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <select
                defaultValue={currentStatus}
                disabled={isPending}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 disabled:opacity-50"
            >
                {Object.values(OrderStatus).map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
            <button
                type="button"
                disabled={isPending}
                onClick={handleDelete}
                className="w-full py-1 text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center justify-center gap-1 disabled:opacity-50"
            >
                <Trash2 className="w-3 h-3" /> 
                {isPending ? 'Processing...' : 'Delete'}
            </button>
        </div>
    )
}
