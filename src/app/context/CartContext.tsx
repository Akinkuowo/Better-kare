'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface CartItem {
    id: string
    name: string
    slug: string
    price: number
    image: string
    categorySlug: string
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    cartCount: number
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        const savedCart = localStorage.getItem('betterkare_cart')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('betterkare_cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(i => i.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }

    const clearCart = () => setCartItems([])

    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
    const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CartProvider')
    return context
}
