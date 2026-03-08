'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Instagram, Twitter, Facebook } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        toast.success("Message sent! We'll get back to you shortly.")
        setIsSubmitting(false)
        ;(e.target as HTMLFormElement).reset()
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen">
            {/* Header */}
            <section className="py-20 px-4 bg-white border-b border-gray-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-sm mb-4 block">Get In Touch</span>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
                        We'd Love to <span className="italic text-gray-400">Hear from You</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Have a question about our products or just want to say hello? Our team is always here to help you elevated your self-care routine.
                    </p>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-5 gap-16">
                        {/* Info Column */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Contact Information</h2>
                                <div className="space-y-8">
                                    {[
                                        { icon: Mail, label: 'Email Us', value: 'hello@betterkare.com' },
                                        { icon: Phone, label: 'Call Us', value: '+234 800 BETTER KARE' },
                                        { icon: MapPin, label: 'Visit Our Boutique', value: '123 Beauty Lane, Victoria Island, Lagos' }
                                    ].map((info, idx) => (
                                        <div key={idx} className="flex gap-6 group">
                                            <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                                <info.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{info.label}</p>
                                                <p className="text-lg font-bold text-gray-900">{info.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Follow Our Journey</h2>
                                <div className="flex gap-4">
                                    {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                                        <a key={idx} href="#" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-100 hover:shadow-lg transition-all">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden group">
                                <MessageSquare className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-100 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-xl font-black text-emerald-900 mb-2 relative z-10">Live Chat Available</h3>
                                <p className="text-emerald-600 font-medium relative z-10 mb-4">Monday - Friday, 9am - 6pm WAT</p>
                                <button className="text-sm font-black text-white bg-emerald-500 px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors relative z-10 shadow-lg shadow-emerald-500/20">
                                    Start Chatting
                                </button>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-3">
                            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-black/[0.02] border border-gray-100">
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Jane Doe"
                                            className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900 font-medium placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input 
                                            required
                                            type="email" 
                                            placeholder="jane@example.com"
                                            className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900 font-medium placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 mb-8">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                                    <select className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900 font-medium appearance-none cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Order Support</option>
                                        <option>Wholesale Opportunities</option>
                                        <option>Press & Media</option>
                                    </select>
                                </div>
                                <div className="space-y-2 mb-10">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea 
                                        required
                                        rows={6}
                                        placeholder="How can we help you?"
                                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900 font-medium placeholder:text-gray-300 resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/5 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : (
                                        <>
                                            <span>Send Message</span>
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
