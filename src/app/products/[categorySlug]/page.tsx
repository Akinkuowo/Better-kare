import { prisma } from '@/app/lib/db'
import ProductCard from '@/app/components/ui/ProductCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
    params: { categorySlug: string }
}

export default async function CategoryPage({ params }: Props) {
    const category = await prisma.category.findUnique({
        where: { slug: params.categorySlug },
    })

    if (!category) return notFound()

    const products = await prisma.product.findMany({
        where: { categoryId: category.id },
        include: { category: true },
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:underline">Home</Link>
                {' / '}
                <Link href="/products" className="hover:underline">Products</Link>
                {' / '}
                <span className="text-gray-800 font-medium">{category.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
                    {category.description && (
                        <p className="text-gray-600 text-lg">{category.description}</p>
                    )}
                </div>
                <div className="mt-4 md:mt-0 text-sm text-gray-500">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products yet</h3>
                    <p className="text-gray-500 mb-6">Check back soon for new arrivals in this category!</p>
                    <Link href="/products" className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                        Browse All Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const parsedProduct = {
                            ...product,
                            images: typeof product.images === 'string' ? JSON.parse(product.images as string) : product.images as string[],
                        }
                        return <ProductCard key={product.id} product={parsedProduct as any} />
                    })}
                </div>
            )}
        </div>
    )
}
