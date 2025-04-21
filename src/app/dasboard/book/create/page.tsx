import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import CreateBook from "@/components/book/CreateBook"
import { apiRequest } from "@/lib/Request";

type Genre = {
  id: string
  title: string
}

async function CreateBookPage() {
  let genre;
  const session = await getServerSession(authOptions)

  try {
    if (!session) {
      throw new Error("Authentication required")
    }

    const genreRes = await apiRequest<{data: Genre[]}>({
      endpoint: "/genre",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    })
    genre = genreRes.data
  } catch (e) {
    console.log("Error in CreateBookPage:", e)
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <CreateBook accessToken={session?.backendTokens.accessToken as string} genre={genre ?? []} />
    </div>
  )
}

export default CreateBookPage

