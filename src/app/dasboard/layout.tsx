import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; 
import { getProfile } from "@/lib/action/user";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session?.id && session?.backendTokens?.accessToken) {
    user = await getProfile(session.id, session.backendTokens.accessToken);
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
