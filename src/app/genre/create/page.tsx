import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AddGenreForm from "@/components/CreateGenreForm"
import { Tag } from "lucide-react"

async function CreateGenrePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="  rounded-lg shadow-lg">
        <AddGenreForm accessToken={session?.backendTokens.accessToken || ""} />
      </div>
    </div>
  )
}

export default CreateGenrePage

