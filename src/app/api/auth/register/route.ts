import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/app/lib/db'

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
        }

        if (password.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ message: 'An account with this email already exists' }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await prisma.user.create({
            data: {
                name: name || null,
                email,
                password: hashedPassword,
                role: 'USER',
            },
        })

        return NextResponse.json({ message: 'Account created successfully' }, { status: 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
