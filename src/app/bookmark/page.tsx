import Footer from "@/components/Footer";
import List from "@/components/List";
import Navbar from "@/components/Navbar";
import { getBookmarkById } from "@/lib/action/bookmark";
import { getProfile } from "@/lib/action/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface BookObject {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  Chapter: chapter[];
}

interface chapter {
  id: string;
}

async function page() {
  let user;
  let books = [];
  const session = await getServerSession(authOptions);
  try {
    if (session?.id && session?.backendTokens?.accessToken) {
      user = await getProfile(session.id, session.backendTokens.accessToken);
      books =
        (await getBookmarkById(
          session.id,
          session.backendTokens.accessToken
        )) || [];

      /*
      ini di lakukan karna data yang dikirim dari backend tidak sesuai dengan yang diharapkan oleh component List
    `chapter` adalah key yang diharapkan oleh component List, sedangkan data yang di kirim dari backend adalah `Chapter`
      */
      books = books.map((book: BookObject) => ({
        ...book,
        chapter: book.Chapter,
      }));
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <Navbar user={user} />
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
            Your Bookmarks
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track your favorite books and never lose your place in your reading
            journey
          </p>
        </div>

        <div className="relative">
          <div className="relative z-10 backdrop-blur-sm bg-gray-900/30 rounded-2xl p-6 border border-gray-800/50 shadow-xl">
            <List books={books} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default page;
