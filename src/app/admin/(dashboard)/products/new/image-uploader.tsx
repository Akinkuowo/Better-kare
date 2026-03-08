'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ImageIcon, X, Upload, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
    name?: string
}

export function ImageUploader({ name = 'images' }: ImageUploaderProps) {
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const [dragOver, setDragOver] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const uploadFiles = useCallback(async (files: FileList | File[]) => {
        const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
        if (imageFiles.length === 0) {
            setError('Please select image files only (JPG, PNG, WEBP, etc.)')
            return
        }

        setError(null)
        setUploading(true)

        try {
            const formData = new FormData()
            imageFiles.forEach((file) => formData.append('files', file))

            const res = await fetch('/api/upload', { method: 'POST', body: formData })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Upload failed')

            setUploadedUrls((prev) => [...prev, ...data.urls])
        } catch (err: any) {
            setError(err.message || 'Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }, [])

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadFiles(e.target.files)
            // Reset input so same file can be re-selected
            e.target.value = ''
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        if (e.dataTransfer.files.length > 0) {
            uploadFiles(e.dataTransfer.files)
        }
    }

    const removeImage = (url: string) => {
        setUploadedUrls((prev) => prev.filter((u) => u !== url))
    }

    return (
        <div className="space-y-4">
            {/* Hidden input carries the image paths to the server action */}
            <input
                type="hidden"
                name={name}
                value={uploadedUrls.join('\n')}
            />

            {/* Drop zone */}
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`
                    relative flex flex-col items-center justify-center gap-3
                    border-2 border-dashed rounded-2xl p-10 cursor-pointer
                    transition-all duration-200
                    ${dragOver
                        ? 'border-indigo-400 bg-indigo-50/60 scale-[1.01]'
                        : 'border-gray-200 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/30'
                    }
                    ${uploading ? 'pointer-events-none opacity-70' : ''}
                `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                />

                {uploading ? (
                    <>
                        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                        <p className="text-sm font-semibold text-indigo-500">Uploading images…</p>
                    </>
                ) : (
                    <>
                        <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">
                            <Upload className="w-7 h-7 text-sky-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-700">
                                Drag & drop images here, or{' '}
                                <span className="text-indigo-600 underline underline-offset-2">browse</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG, WEBP, AVIF — multiple files supported
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Error message */}
            {error && (
                <p className="text-sm text-red-600 font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    {error}
                </p>
            )}

            {/* Uploaded image previews */}
            {uploadedUrls.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {uploadedUrls.length} image{uploadedUrls.length !== 1 ? 's' : ''} uploaded
                        <span className="text-gray-400 font-normal ml-2">— first will be shown as main photo</span>
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {uploadedUrls.map((url, i) => (
                            <div
                                key={url}
                                className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 border border-gray-200"
                            >
                                {i === 0 && (
                                    <span className="absolute top-1 left-1 z-10 bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                        Main
                                    </span>
                                )}
                                <Image
                                    src={url}
                                    alt={`Product image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(url)}
                                    className="absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}

                        {/* Add more button */}
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-indigo-500"
                        >
                            <ImageIcon className="w-5 h-5" />
                            <span className="text-[10px] font-bold">Add more</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
