import { prisma } from '@/app/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/app/components/ui/AddToCartButton'

interface Props {
    params: { categorySlug: string; productSlug: string }
}

export default async function ProductDetailPage({ params }: Props) {
    const product = await prisma.product.findFirst({
        where: { slug: params.productSlug },
        include: { category: true },
    })

    if (!product) return notFound()

    const images: string[] = typeof product.images === 'string'
        ? JSON.parse(product.images as string)
        : product.images as string[]

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:underline">Home</Link>
                {' / '}
                <Link href="/products" className="hover:underline">Products</Link>
                {' / '}
                <Link href={`/products/${product.category.slug}`} className="hover:underline">{product.category.name}</Link>
                {' / '}
                <span className="text-gray-800 font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    {images[0] ? (
                        <Image
                            src={images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                            No image available
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category.name}</p>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-3xl font-bold text-gray-900 mb-6">₦{product.price.toLocaleString()}</p>

                    {product.description && (
                        <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
                    )}

                    <div className="mb-6">
                        {product.stock > 0 ? (
                            <span className="text-green-600 text-sm font-medium">✓ In Stock ({product.stock} available)</span>
                        ) : (
                            <span className="text-red-500 text-sm font-medium">✗ Out of Stock</span>
                        )}
                    </div>

                    {product.stock > 0 && (
                        <AddToCartButton
                            product={{
                                id: product.id,
                                name: product.name,
                                slug: product.slug,
                                price: product.price,
                                images,
                                categorySlug: product.category.slug,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
