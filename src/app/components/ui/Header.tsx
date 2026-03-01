'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/app/context/CartContext'

interface Category {
    id: string
    name: string
    slug: string
}

export default function Header() {
    const { data: session } = useSession()
    const { cartCount } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => { })
    }, [])

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-gray-800">
                        Better Kare
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/products" className="text-gray-600 hover:text-gray-900 transition font-medium">
                            All Products
                        </Link>
                        {categories.slice(0, 3).map((category) => (
                            <Link
                                key={category.slug}
                                href={`/products/${category.slug}`}
                                className="text-gray-600 hover:text-gray-900 transition"
                            >
                                {category.name}
                            </Link>
                        ))}
                        {categories.length > 3 && (
                            <div className="relative group">
                                <button className="text-gray-600 hover:text-gray-900 transition">
                                    More ▾
                                </button>
                                <div className="absolute hidden group-hover:block top-full right-0 bg-white shadow-lg rounded-xl py-2 min-w-[200px] border border-gray-100 mt-1">
                                    {categories.slice(3).map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/products/${category.slug}`}
                                            className="block px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        <Link href="/cart" className="relative text-gray-600 hover:text-gray-900">
                            <ShoppingBag className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User */}
                        {session ? (
                            <div className="relative">
                                <button
                                    className="text-gray-600 hover:text-gray-900"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                >
                                    <User className="w-6 h-6" />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 bg-white shadow-lg rounded-xl py-2 min-w-[160px] border border-gray-100 mt-1">
                                        <p className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100">
                                            {session.user?.email}
                                        </p>
                                        {(session.user as any)?.role === 'ADMIN' && (
                                            <Link
                                                href="/admin"
                                                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                signOut()
                                                setIsUserMenuOpen(false)
                                            }}
                                            className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="text-gray-600 hover:text-gray-900">
                                <User className="w-6 h-6" />
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
                        <Link
                            href="/products"
                            className="block py-2 text-gray-700 font-medium hover:text-gray-900"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            All Products
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/products/${category.slug}`}
                                className="block py-2 text-gray-600 hover:text-gray-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    )
}