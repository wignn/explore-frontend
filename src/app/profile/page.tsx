
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import { getProfile } from "@/lib/action/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  let user = null;
  const session = await getServerSession(authOptions);

  if (session?.id && session?.backendTokens?.accessToken) {
    try {
      user = await getProfile(session.id, session.backendTokens.accessToken);
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
    }
  } else {
    redirect("/login");
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <ProfileCard users={user} accessToken={session?.backendTokens.accessToken as string} />
      </div>
      <Footer />
    </div>
  );
}
