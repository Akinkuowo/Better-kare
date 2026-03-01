import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/app/lib/db'
import ProductCard from './components/ui/ProductCard'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from 'react'

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    include: { category: true },
  })

  const categories = await prisma.category.findMany()

  const newArrivals = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
    include: { category: true },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-2xl overflow-hidden mb-16">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3"
          alt="Beauty products"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to BeautyLife</h1>
            <p className="text-xl mb-8">Discover your perfect beauty routine</p>
            <Link
              href="/products"
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category: { id: Key | null | undefined; slug: any; image: string | StaticImport; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined }) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              className="group relative h-48 rounded-lg overflow-hidden"
            >
              {category.image && (
                <Image
                  src={
                    typeof category.image === 'string' && category.image.startsWith('[')
                      ? JSON.parse(category.image)[0]
                      : category.image
                  }
                  alt={(category.name as string) || ""}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product: { id: any, images: any }) => {
            const parsedProduct = {
              ...product,
              images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images
            };
            return <ProductCard key={product.id} product={parsedProduct as any} />
          })}
        </div>
      </section>

      {/* New Arrivals */}
      <section>
        <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product: { id: any, images: any }) => {
            const parsedProduct = {
              ...product,
              images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images
            };
            return <ProductCard key={product.id} product={parsedProduct as any} />
          })}
        </div>
      </section>
    </div>
  )
}