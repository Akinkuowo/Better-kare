import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 })
        }

        const urls: string[] = []

        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                continue // skip non-image files
            }

            // Build a unique filename
            const ext = file.name.split('.').pop() || 'jpg'
            const base = file.name
                .replace(/\.[^/.]+$/, '')         // remove extension
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase()
                .slice(0, 40)
            const filename = `product-images/${Date.now()}-${base}.${ext}`

            // Upload directly to Vercel Blob
            const blob = await put(filename, file, {
                access: 'public',
            })

            urls.push(blob.url)
        }

        if (urls.length === 0) {
            return NextResponse.json(
                { error: 'No valid image files were uploaded' },
                { status: 400 }
            )
        }

        return NextResponse.json({ urls })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}