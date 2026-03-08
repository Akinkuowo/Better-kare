'use server'

import { prisma } from "@/app/lib/db"
import { revalidatePath } from "next/cache"
import { OrderStatus } from "@prisma/client"

export async function updateOrderStatus(id: string, status: OrderStatus) {
    try {
        await prisma.order.update({
            where: { id },
            data: { status }
        })
        revalidatePath('/admin/orders')
        revalidatePath('/customer/dashboard')
    } catch (error) {
        console.error('Failed to update order status:', error)
        throw new Error('Failed to update order status')
    }
}

export async function deleteOrder(id: string) {
    try {
        await prisma.order.delete({
            where: { id }
        })
        revalidatePath('/admin/orders')
    } catch (error) {
        console.error('Failed to delete order:', error)
        throw new Error('Failed to delete order')
    }
}
