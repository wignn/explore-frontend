import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; 
import { apiRequest } from "@/lib/Request";
import { UserInterface } from "@/types/user";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session?.id && session?.backendTokens?.accessToken) {
    const resUser =await apiRequest<{ data:  UserInterface  }>({
      endpoint: `/user/${session.id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    })
    user = resUser?.data;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user ?? undefined} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
