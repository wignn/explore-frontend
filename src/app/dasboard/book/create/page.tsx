import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getGenre } from "@/lib/action/genre"
import CreateBook from "@/components/book/CreateBook"

async function CreateBookPage() {
  let genre;
  const session = await getServerSession(authOptions)

  try {
    if (!session) {
      throw new Error("Authentication required")
    }

    genre = await getGenre()
  } catch (e) {
    console.log("Error in CreateBookPage:", e)
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <CreateBook accessToken={session?.backendTokens.accessToken as string} genre={genre} />
    </div>
  )
}

export default CreateBookPage

