import Footer from "@/components/Footer";
import List from "@/components/List";
import Navbar from "@/components/Navbar";
import Rank from "@/components/Rank";
import { getProfile } from "@/lib/action/user";
import { bookList } from "@/lib/action/book";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { TrendingUp, Clock } from "lucide-react";
import Hero from "@/components/Hero";

export default async function Home() {
  let user = null;
  let books = [];
  let isError = false;

  try {
    const session = await getServerSession(authOptions);

    if (session?.id && session?.backendTokens?.accessToken) {
      const profile = await getProfile(
        session.id,
        session.backendTokens.accessToken
      );
      user = profile !== "unauthorized" ? profile : null;
    }

    const allBooks = (await bookList()) || [];
    const sortedBooks = allBooks.sort(
      (a: { updatedAt: string }, b: { updatedAt: string }) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    books = sortedBooks.slice(0, 12);
  } catch (error) {
    console.error("Error pada halaman Home:", error);
    books = [];
    isError = true;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900">
      <Navbar user={user} />
      <main className="flex-1">
        <Hero user={user} book={books} />
        <section className="py-8 md:py-12">
          <div className=" mx-auto lg:px-4 sm:px-6 px-2">
            <div className="mb-8 flex items-center gap-3">
              <Clock className="h-6 w-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Recently Updated
              </h2>
            </div>
            <List books={books} />
          </div>
        </section>

        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        <section className="py-8 md:py-12">
          <div className=" mx-auto px-4">
            <div className="mb-8 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Trending Books
              </h2>
            </div>

            {isError ? (
              <div className="rounded-xl bg-gray-800/50 p-8 text-center backdrop-blur-sm">
                <p className="text-gray-400">
                  There was an error loading the trending books. Please try
                  again later.
                </p>
              </div>
            ) : (
              <Rank books={books} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
