'use server'

import { prisma } from "@/app/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const CategorySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    image: z.string().url().optional().or(z.literal('')),
})

export async function createCategory(formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        image: formData.get('image') as string,
    }

    const validated = CategorySchema.parse(data)
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    await prisma.category.create({
        data: {
            ...validated,
            slug,
        },
    })

    revalidatePath('/admin/categories')
    revalidatePath('/products')
}

export async function updateCategory(id: string, formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        image: formData.get('image') as string,
    }

    const validated = CategorySchema.parse(data)
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    await prisma.category.update({
        where: { id },
        data: {
            ...validated,
            slug,
        },
    })

    revalidatePath('/admin/categories')
    revalidatePath('/products')
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({
        where: { id },
    })

    revalidatePath('/admin/categories')
    revalidatePath('/products')
}
