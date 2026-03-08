import { prisma } from "@/app/lib/db"
import CategoryForm from "@/app/components/admin/CategoryForm"
import { updateCategory } from "@/app/actions/category"
import { notFound } from "next/navigation"

interface EditCategoryPageProps {
    params: {
        id: string
    }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
    const category = await prisma.category.findUnique({
        where: { id: params.id }
    })

    if (!category) {
        notFound()
    }

    const updateAction = updateCategory.bind(null, category.id)

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Edit Category</h2>
                <p className="text-gray-500 font-medium">Update the details of your category.</p>
            </div>
            <CategoryForm initialData={category} onSubmit={updateAction} />
        </div>
    )
}
