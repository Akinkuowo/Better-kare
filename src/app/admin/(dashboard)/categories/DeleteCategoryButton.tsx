'use client'

import { Trash2 } from "lucide-react"
import { deleteCategory } from "@/app/actions/category"
import { toast } from "sonner"
import { useTransition } from "react"

interface DeleteCategoryButtonProps {
    id: string
}

export function DeleteCategoryButton({ id }: DeleteCategoryButtonProps) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this category?')) return

        startTransition(async () => {
            try {
                await deleteCategory(id)
                toast.success('Category deleted successfully')
            } catch (error) {
                toast.error('Failed to delete category')
            }
        })
    }

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    )
}
