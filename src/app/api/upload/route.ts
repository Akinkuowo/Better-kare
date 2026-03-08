import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 })
        }

        // Ensure the upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'product-images')
        await mkdir(uploadDir, { recursive: true })

        const urls: string[] = []

        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                continue // skip non-image files
            }

            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Create a unique filename: timestamp + sanitised original name
            const ext = path.extname(file.name) || '.jpg'
            const base = path.basename(file.name, ext)
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase()
                .slice(0, 40)
            const filename = `${Date.now()}-${base}${ext}`

            const filepath = path.join(uploadDir, filename)
            await writeFile(filepath, buffer)

            urls.push(`/product-images/${filename}`)
        }

        if (urls.length === 0) {
            return NextResponse.json({ error: 'No valid image files were uploaded' }, { status: 400 })
        }

        return NextResponse.json({ urls })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
