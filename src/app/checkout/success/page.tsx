'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react'

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('id')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center py-20 px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-emerald-50 text-emerald-500 mb-8 border border-emerald-100 shadow-xl shadow-emerald-500/5 animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                </div>

                <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Payment Successful!</h1>
                <p className="text-xl text-gray-500 font-medium mb-12">Thank you for your purchase. Your order is being processed.</p>

                <div className="bg-white rounded-[3rem] shadow-2xl shadow-black/[0.03] border border-gray-100 p-10 mb-12 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                        <Package className="w-32 h-32 text-black" />
                    </div>

                    <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Order Details</h2>
                    <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-center py-4 border-b border-gray-50">
                            <span className="text-gray-500 font-bold">Order ID</span>
                            <span className="text-gray-900 font-black font-mono">{orderId?.toUpperCase() || 'BK-PROCESSED-001'}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-50">
                            <span className="text-gray-500 font-bold">Status</span>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest border border-emerald-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Payment Confirmed
                            </span>
                        </div>
                        <div className="pt-4">
                            <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                                A confirmation email with receipt and tracking details will be sent to your inbox shortly.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <Link
                        href="/products"
                        className="w-full sm:w-auto px-8 py-5 bg-black text-white rounded-2xl font-black hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 active:scale-[0.98]"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Continue Shopping</span>
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-5 bg-white text-gray-900 border border-gray-100 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        <span>Back to Home</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
