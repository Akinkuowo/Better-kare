import { prisma } from "@/app/lib/db"
import Link from "next/link"
import Image from "next/image"
import { deleteCategory } from "@/app/actions/category"
import { Pencil, Trash2, Plus } from "lucide-react"

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
                <Link
                    href="/admin/categories/new"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all flex items-center shadow-lg hover:shadow-indigo-200"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    New Category
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 relative bg-gray-50">
                            {category.image ? (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/admin/categories/${category.id}`}
                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </Link>
                                    <form action={deleteCategory.bind(null, category.id)}>
                                        <button
                                            type="submit"
                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                            onClick={(e) => {
                                                if (!confirm('Are you sure you want to delete this category?')) e.preventDefault()
                                            }}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2">{category.description || 'No description available.'}</p>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No categories found. Create your first one!</p>
                </div>
            )}
        </div>
    )
}
