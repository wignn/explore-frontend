import Footer from "@/components/Footer";
import List from "@/components/List";
import Navbar from "@/components/Navbar";
import Rank from "@/components/Rank";
import { getProfile } from "@/lib/action/user";
import { bookList } from "@/lib/action/book";
import { authOptions } from "@/lib/auth";
import { Suspense } from "react"
import { BookListSkeleton } from "@/components/List";
import { getServerSession } from "next-auth";
import { bookInterface } from "@/types/book";


  interface RankProps {

      id: string
      title: string
      cover: string
      chapter: number
      updatedAt: string
      popular: boolean
      genre?: {
        id: string
        title: string
      }[]
  }[]

export default async function Home() {
    let user = null;
    let books = []; 

    try {
        const session = await getServerSession(authOptions);

        if (session?.id && session?.backendTokens?.accessToken) {
            const profile = await getProfile(session.id, session.backendTokens.accessToken);
            user = profile !== "unauthorized" ? profile : null;
        }

        const allBooks = await bookList() || [];
        const sortedBooks = allBooks.sort((a:any, b:any) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });

        books = sortedBooks.slice(0, 24); 

    } catch (error) {
        console.error("aError pada halaman Home:", error);
        books = [];
    }

    return (

        <div>
            <Navbar user={user} />
            <div className="bg-gray-900  w-full min-h-screen p-0 md:p-10">
            <Suspense fallback={<BookListSkeleton />}>
                <List books={books} text="Recently Updated" /></Suspense>
                <Rank books={books} />
            </div>
            <Footer />
        </div>
    );
}``

