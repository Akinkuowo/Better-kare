'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, UploadCloud } from 'lucide-react'
import Image from 'next/image'

interface CategoryFormProps {
    initialData?: any
    onSubmit: (formData: FormData) => Promise<void>
}

export default function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState(initialData?.image || '')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const formData = new FormData(e.currentTarget)
            formData.append('image', image)
            await onSubmit(formData)
            router.push('/admin/categories')
            router.refresh()
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Category Name</label>
                <input
                    name="name"
                    required
                    defaultValue={initialData?.name}
                    placeholder="e.g. Wellness Supplements"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Description</label>
                <textarea
                    name="description"
                    rows={4}
                    defaultValue={initialData?.description}
                    placeholder="Describe what this category is about..."
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900"
                />
            </div>

            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-indigo-500" />
                    Category Image URL
                </label>
                <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900"
                />

                {image && (
                    <div className="relative aspect-video w-full max-w-md rounded-2xl overflow-hidden shadow-lg group">
                        <Image
                            src={image}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => setImage('')}
                            className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
                >
                    {isSubmitting ? 'Processing...' : initialData ? 'Update Category' : 'Create Category'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
