import CategoryForm from "@/app/components/admin/CategoryForm"
import { createCategory } from "@/app/actions/category"

export default function NewCategoryPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Create Category</h2>
                <p className="text-gray-500 font-medium">Add a new category to organize your products.</p>
            </div>
            <CategoryForm onSubmit={createCategory} />
        </div>
    )
}
