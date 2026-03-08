'use client'

import { Trash2 } from "lucide-react"
import { deleteProduct } from "@/app/actions/products"

export function DeleteProductButton({ productId }: { productId: string }) {
    return (
        <form action={deleteProduct.bind(null, productId)}>
            <button
                type="submit"
                className="text-red-600 hover:text-red-900"
                onClick={(e) => {
                    if (!confirm('Are you sure you want to delete this product?')) {
                        e.preventDefault()
                    }
                }}
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </form>
    )
}
