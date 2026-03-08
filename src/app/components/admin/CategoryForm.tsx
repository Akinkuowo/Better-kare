'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ImageUploader } from './ImageUploader'

interface CategoryFormProps {
    initialData?: any
    onSubmit: (formData: FormData) => Promise<void>
}

export default function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const formData = new FormData(e.currentTarget)
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
                    Category Image
                </label>
                <ImageUploader 
                    name="image" 
                    multiple={false} 
                    initialUrls={initialData?.image ? [initialData.image] : []} 
                />
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
