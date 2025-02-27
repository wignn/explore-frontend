import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard"
import { getProfile } from "@/lib/action/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export default async function ProfilePage() {
  let user, session;
  try {
    session = await getServerSession(authOptions)
    if (session?.id && session?.backendTokens?.accessToken) {
      user = await getProfile(session.id, session.backendTokens.accessToken)
    }
  } catch (error) {
    console.error("❌ Error in ProfilePage:", error)
    
  }

  return (
    <div><Navbar user={user} />
    <div className="min-h-screen bg-gray-900  flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <ProfileCard users={user}/>
     
    </div> <Footer/>
    </div>
  )
}

