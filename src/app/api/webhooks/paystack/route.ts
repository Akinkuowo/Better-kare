import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/app/lib/db'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
            .update(JSON.stringify(body))
            .digest('hex')

        if (hash !== req.headers.get('x-paystack-signature')) {
            return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
        }

        const event = body.event

        if (event === 'charge.success') {
            const { reference } = body.data

            await prisma.order.updateMany({
                where: { paystackRef: reference },
                data: { status: 'PAID' }
            })
        }

        return NextResponse.json({ message: 'Webhook received' }, { status: 200 })
    } catch (err) {
        console.error('Webhook error:', err)
        return NextResponse.json({ message: 'Webhook handler failed' }, { status: 500 })
    }
}
