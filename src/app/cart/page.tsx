'use client'

import { useCart } from '@/app/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-6">🛍️</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything yet. Start shopping!</p>
                    <Link href="/products" className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition">
                        Browse Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-10">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400 uppercase mb-1">{item.categorySlug}</p>
                                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                <p className="text-gray-700 font-bold mt-1">₦{item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400 hover:text-red-600 transition p-2"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition mt-2">
                        Clear all items
                    </button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                        <div className="space-y-3 text-sm text-gray-600 mb-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900 text-lg mb-6">
                            <span>Total</span>
                            <span>₦{cartTotal.toLocaleString()}</span>
                        </div>
                        <Link
                            href="/checkout"
                            className="block w-full text-center bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition"
                        >
                            Proceed to Checkout
                        </Link>
                        <Link href="/products" className="block w-full text-center text-gray-500 hover:text-gray-700 py-3 text-sm transition">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
