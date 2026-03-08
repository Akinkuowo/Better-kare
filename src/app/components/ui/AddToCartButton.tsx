'use client'

import { useCart } from '@/app/context/CartContext'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface Props {
    product: {
        id: string
        name: string
        slug: string
        price: number
        images: string[]
        categorySlug: string
    }
}

export default function AddToCartButton({ product }: Props) {
    const { addToCart } = useCart()
    const [added, setAdded] = useState(false)

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images[0] || '',
            categorySlug: product.categorySlug,
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 ${added
                    ? 'bg-green-500 scale-95'
                    : 'bg-gray-900 hover:bg-gray-700'
                }`}
        >
            <ShoppingBag className="w-5 h-5" />
            {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
    )
}
