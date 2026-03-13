'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/app/context/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const PaystackButton: any = dynamic(() => import('react-paystack').then((mod) => mod.PaystackButton), {
    ssr: false,
})
import { CreditCard, MapPin, Phone, Mail, User, ShieldCheck } from 'lucide-react'

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && cartItems.length === 0) {
            router.push('/cart')
        }
    }, [mounted, cartItems, router])

    if (!mounted || cartItems.length === 0) {
        return null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleOrderSuccess = async (reference: any) => {
        setLoading(true)
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    total: cartTotal,
                    items: cartItems,
                    paystackRef: reference.reference
                }),
            })

            if (res.ok) {
                const order = await res.json()
                clearCart()
                router.push(`/checkout/success?id=${order.id}`)
            } else {
                alert('Payment successful, but failed to save order. Please contact support.')
            }
        } catch (error) {
            console.error('Error saving order:', error)
            alert('An error occurred while saving your order.')
        } finally {
            setLoading(false)
        }
    }

    const componentProps = {
        email: formData.email,
        amount: Math.round(cartTotal * 100), // Paystack amount is in kobo/cents
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        text: "Complete Purchase",
        onSuccess: (reference: any) => handleOrderSuccess(reference),
        onClose: () => alert("Transaction was not completed, window closed."),
    }

    const isFormValid = formData.name && formData.email && formData.phone && formData.address && formData.city

    return (
        <div className="bg-[#fcfcfc] min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Left Side: Checkout Form */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Checkout</h1>
                            <p className="text-gray-500 font-medium">Please provide your shipping and contact information</p>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-xl shadow-black/[0.03] border border-gray-100/80 p-8 md:p-10 space-y-10">
                            {/* Contact Info */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 border border-gray-100">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-gray-50/50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-gray-50/50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+234..."
                                                className="w-full bg-gray-50/50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 border border-gray-100">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                                </div>
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Street Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            placeholder="123 Luxury Lane"
                                            className="w-full bg-gray-50/50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">City / State</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            placeholder="Lagos, Nigeria"
                                            className="w-full bg-gray-50/50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="md:w-[400px]">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.04] border border-gray-100 p-8 sticky top-24">
                            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Summary</h2>

                            <div className="space-y-5 mb-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300 uppercase font-bold">No img</div>
                                            )}
                                            <div className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <h3 className="text-sm font-bold text-gray-900 truncate">{item.name}</h3>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-0.5">{item.categorySlug}</p>
                                        </div>
                                        <div className="flex flex-col justify-center text-right">
                                            <p className="text-sm font-black text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-dashed border-gray-100 pt-6 space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span>₦{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium tracking-tight">
                                    <span>Shipping</span>
                                    <span className="text-emerald-500 font-bold uppercase text-xs">Calculated at next step</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">Total</span>
                                    <span className="text-3xl font-black text-gray-900">₦{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            {isFormValid ? (
                                <div className="space-y-4">
                                    <PaystackButton
                                        className="w-full bg-black text-white py-5 rounded-[1.5rem] font-black hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-[0.98] flex items-center justify-center gap-3"
                                        {...componentProps}
                                    />
                                    <div className="flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4" />
                                        Secure Payment Powered by Paystack
                                    </div>
                                </div>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-gray-100 text-gray-400 py-5 rounded-[1.5rem] font-black cursor-not-allowed opacity-60"
                                >
                                    Fill details to pay
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
