import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const { name, email, phone, address, city, total, items, paystackRef } = await req.json()

        if (!email || !name || !items || items.length === 0) {
            return NextResponse.json({ message: 'Missing required order information' }, { status: 400 })
        }

        const order = await prisma.order.create({
            data: {
                userId: session?.user?.id || null,
                name,
                email,
                phone,
                address,
                city,
                total,
                paystackRef,
                status: 'PAID', // In a real production app, we would set this to PENDING and update to PAID via Paystack Webhook
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image || null,
                    }))
                }
            },
            include: {
                items: true
            }
        })

        return NextResponse.json(order, { status: 201 })
    } catch (err) {
        console.error('Order creation error:', err)
        return NextResponse.json({ message: 'Failed to create order' }, { status: 500 })
    }
}
