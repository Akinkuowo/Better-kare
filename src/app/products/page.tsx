import { prisma } from '@/app/lib/db'
import ProductCard from '@/app/components/ui/ProductCard'

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
                    <p className="text-gray-600 text-lg">Browse our entire collection of premium beauty essentials.</p>
                </div>
                <div className="mt-4 md:mt-0 text-sm text-gray-500">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500">We're currently restocking. Check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const parsedProduct = {
                            ...product,
                            images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images
                        };
                        return <ProductCard key={product.id} product={parsedProduct as any} />
                    })}
                </div>
            )}
        </div>
    )
}
