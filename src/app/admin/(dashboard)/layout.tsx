import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import AdminLayoutContent from "@/app/components/admin/AdminLayoutContent"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <AdminLayoutContent session={session}>
            {children}
        </AdminLayoutContent>
    )
}
