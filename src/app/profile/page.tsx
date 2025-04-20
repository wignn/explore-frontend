import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import { authOptions } from "@/lib/auth";
import { apiRequest } from "@/lib/Request";
import { UserInterface } from "@/types/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  let user = null;
  const session = await getServerSession(authOptions);

  if (session?.id && session?.backendTokens?.accessToken) {
    try {
      const profileRes = await apiRequest<{ data: UserInterface }>({
        endpoint: `/user/${session.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
      });
      user = profileRes?.data;
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
    }
  } else {
    redirect("/login");
  }

  return (
    <div>
      {user ? (
        <div>
          <Navbar user={user ?? undefined} />
          <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <ProfileCard
              users={user}
              accessToken={session?.backendTokens.accessToken as string}
            />
          </div>
          <Footer />
        </div>
      ) : (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center text-center py-12">
          <h1 className="text-2xl font-bold text-white">User not found</h1>
        </div>
      )}
    </div>
  );
}
