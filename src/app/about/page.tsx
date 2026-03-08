import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Heart, Users, ArrowRight } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/about_hero_aesthetic_1772941183252.png"
                    alt="Better Kare Lifestyle"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 animate-fade-in">
                        Elevating Your <span className="text-emerald-300">Daily Rituals</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-gray-100 max-w-2xl mx-auto leading-relaxed">
                        Better Kare is more than a store. It's a commitment to mindfulness, quality, and the art of self-care.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/brand_story_image_1772941432752.png"
                                alt="Our Story"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-sm mb-4 block">Our Journey</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-8 italic">
                                Crafted with intention, delivered with love.
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                                <p>
                                    Founded on the belief that everyone deserves a moment of peace in their busy lives, Better Kare started as a small passion project focused on hand-poured candles and mindful journaling.
                                </p>
                                <p>
                                    Today, we've grown into a curated destination for beauty essentials and lifestyle products that don't just look good—they make you feel good. Every item in our collection is handpicked for its quality, sustainability, and ability to spark joy.
                                </p>
                                <p>
                                    We believe that self-care isn't a luxury; it's a foundation for a better life. Thank you for being part of our story.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">What We Stand For</h2>
                        <p className="text-gray-500 font-medium">The pillars that define the Better Kare experience.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: "Uncompromising Quality",
                                desc: "We source only the finest materials and ingredients, ensuring every product meets our rigorous standards for excellence."
                            },
                            {
                                icon: Heart,
                                title: "Mindful Living",
                                desc: "Our products are designed to encourage presence, reflection, and the celebration of life's small, beautiful moments."
                            },
                            {
                                icon: Users,
                                title: "Community First",
                                desc: "We are built by our community. Your feedback and stories drive everything we do, from product curation to customer care."
                            }
                        ].map((value, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 bg-black text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
                        Experience the <span className="text-emerald-400 italic">Better Kare</span> Standard Today.
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/products"
                            className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-400 hover:text-white transition-all flex items-center justify-center gap-2 group"
                        >
                            Explore Collection
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
