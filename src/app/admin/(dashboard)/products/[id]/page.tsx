import { prisma } from '@/app/lib/db'
import { updateProduct } from '@/app/actions/products'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, ImageIcon, Tag, DollarSign, Package, Star, Sparkles } from 'lucide-react'
import { ImageUploader } from '@/app/components/admin/ImageUploader'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    })

    if (!product) {
        notFound()
    }

    const categories = await prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
    })

    const productImages: string[] = Array.isArray(product.images)
        ? (product.images as string[])
        : typeof product.images === 'string'
            ? JSON.parse(product.images)
            : []

    const updateProductWithId = updateProduct.bind(null, product.id)

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Edit Product</h2>
                    <p className="text-gray-400 font-medium text-sm mt-0.5">Update the details of "{product.name}".</p>
                </div>
            </div>

            {/* Form */}
            <form action={updateProductWithId} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Product Information</h3>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                            Product Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            defaultValue={product.name}
                            placeholder="e.g. Premium Vitamin C Serum"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            defaultValue={product.description || ''}
                            placeholder="Describe the product — what it does, who it's for, key benefits..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium resize-none"
                        />
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Pricing & Inventory</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Price */}
                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                                Price (₦) <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    defaultValue={product.price}
                                    placeholder="0.00"
                                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <label htmlFor="stock" className="block text-sm font-semibold text-gray-700">
                                Stock Quantity
                            </label>
                            <div className="relative">
                                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    min="0"
                                    defaultValue={product.stock}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category & Options */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                            <Tag className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Category & Options</h3>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700">
                            Category <span className="text-rose-500">*</span>
                        </label>
                        {categories.length === 0 ? (
                            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 text-sm font-medium">
                                <span>No categories found.</span>
                                <Link href="/admin/categories/new" className="underline font-bold hover:text-amber-800">
                                    Create one first →
                                </Link>
                            </div>
                        ) : (
                            <select
                                id="categoryId"
                                name="categoryId"
                                required
                                defaultValue={product.categoryId}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium appearance-none cursor-pointer"
                            >
                                <option value="">Select a category...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Featured toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center">
                                <Star className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-800">Featured Product</div>
                                <div className="text-xs text-gray-400">Show this product in the featured section</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="featured" defaultChecked={product.featured} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    {/* New product toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-sky-500" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-800">New Arrival</div>
                                <div className="text-xs text-gray-400">Mark this product as a new arrival</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="isNew" defaultChecked={product.isNew} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-sky-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Product Images</h3>
                    </div>

                    <ImageUploader name="images" initialUrls={productImages} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pb-4">
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 text-base"
                    >
                        Update Product
                    </button>
                    <Link
                        href="/admin/products"
                        className="flex-1 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all text-center text-base"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
