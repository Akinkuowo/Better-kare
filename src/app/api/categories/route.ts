import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            select: { id: true, name: true, slug: true },
            orderBy: { name: 'asc' },
        })
        return NextResponse.json(categories)
    } catch {
        return NextResponse.json([], { status: 500 })
    }
}
