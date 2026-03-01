import { Product as PrismaProduct, Category as PrismaCategory } from '@prisma/client'

export interface ProductWithCategory extends PrismaProduct {
    category: PrismaCategory
}

export interface CategoryWithProducts extends PrismaCategory {
    products?: ProductWithCategory[]
}

// For the ProductCard component
export interface ProductCardProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        images: string[]
        category: {
            name: string
            slug: string
        }
    }
}

// For the Category card
export interface CategoryCardProps {
    category: {
        id: string
        name: string
        slug: string
        image: string | null
        description: string | null
    }
}