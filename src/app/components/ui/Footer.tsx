'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Better Kare</h2>
                        <p className="text-sm leading-relaxed">
                            Your one-stop shop for beauty essentials, candles, journals and more.
                            We believe in self-care and quality products for a better lifestyle.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products/beauty-essentials" className="hover:text-white transition-colors">Beauty Essentials</Link></li>
                            <li><Link href="/products/scented-candles" className="hover:text-white transition-colors">Scented Candles</Link></li>
                            <li><Link href="/products/journals" className="hover:text-white transition-colors">Journals</Link></li>
                            <li><Link href="/products/skincare" className="hover:text-white transition-colors">Skincare</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                                <span>123 Beauty Lane, Style City, SC 12345</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                                <span>hello@betterkare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Better Kare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
