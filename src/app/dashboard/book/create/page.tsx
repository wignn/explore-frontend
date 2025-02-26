import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getGenre } from "@/lib/action/genre"
import CreateBook from "@/components/book/CreateBook"

async function CreateBookPage() {
  let genre, err
  const session = await getServerSession(authOptions)

  try {
    if (!session) {
      throw new Error("Authentication required")
    }

    genre = await getGenre()
  } catch (e: any) {
    console.log(e.message)
    err = true
  }

  if (err) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <CreateBook accessToken={session?.backendTokens.accessToken} genre={genre} />
    </div>
  )
}

export default CreateBookPage

