'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Plus, X } from 'lucide-react'

const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be positive'),
    categoryId: z.string().min(1, 'Category is required'),
    stock: z.number().int().min(0, 'Stock must be 0 or more'),
    featured: z.boolean().default(false),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
    initialData?: any
    categories: any[]
    onSubmit: (formData: FormData) => Promise<void>
}

export default function ProductForm({ initialData, categories, onSubmit }: ProductFormProps) {
    const router = useRouter()
    const [images, setImages] = useState<string[]>(initialData?.images || [])
    const [imageUrl, setImageUrl] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            price: 0,
            categoryId: '',
            stock: 0,
            featured: false,
        },
    })

    const addImage = () => {
        if (imageUrl && !images.includes(imageUrl)) {
            setImages([...images, imageUrl])
            setImageUrl('')
        }
    }

    const removeImage = (url: string) => {
        setImages(images.filter(img => img !== url))
    }

    const handleFormSubmit = async (data: ProductFormData) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value.toString())
        })
        formData.append('images', JSON.stringify(images))

        await onSubmit(formData)
        router.push('/admin/products')
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-2xl">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                </label>
                <input
                    type="text"
                    {...register('name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock
                    </label>
                    <input
                        type="number"
                        {...register('stock', { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                </label>
                <select
                    {...register('categoryId')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && (
                    <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                )}
            </div>

            <div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        {...register('featured')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured Product</span>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                </label>
                <div className="flex space-x-2 mb-4">
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={addImage}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative aspect-square">
                            <Image
                                src={img}
                                alt={`Product image ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(img)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
                </button>
            </div>
        </form>
    )
}