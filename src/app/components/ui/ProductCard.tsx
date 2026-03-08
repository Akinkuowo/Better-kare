import Link from 'next/link'
import Image from 'next/image'

interface Product {
    id: string
    name: string
    slug: string
    price: number
    images: string[]
    category: {
        name: string
        slug: string
    }
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.category.slug}/${product.slug}`}>
            <div className="group cursor-pointer">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    {product.images[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-500">{product.category.name}</p>
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </Link>
    )
}