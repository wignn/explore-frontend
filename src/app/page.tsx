import Footer from "@/components/Footer";
import List from "@/components/List";
import Navbar from "@/components/Navbar";
import Rank from "@/components/Rank";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { TrendingUp, Clock } from "lucide-react";
import Hero from "@/components/Hero";
import { apiRequest } from "@/lib/Request";
import { bookInterface } from "@/types/book";
import { UserInterface } from "@/types/user";

interface BookReturnType {
  books: bookInterface[];
  totalBooks: number;
  totalPage: number;
}

export default async function Home() {
  let user = null;
  let books: bookInterface[] = [];
  let isError = false;

  try {
    const session = await getServerSession(authOptions);

    if (session?.id && session?.backendTokens?.accessToken) {
      const resProfile = await apiRequest<{data: UserInterface}>({
        endpoint: `/user/${session.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
      })

      user = resProfile?.data;
    }

    const res = await apiRequest<{ data: BookReturnType }>({
      endpoint: "/book/list?limit=12&page=1&status=Ongoing",
      method: "GET",
    });
    const data = res?.data;
    books = Array.isArray(data.books) ? data.books : [];
  } catch (error) {
    console.error("Error pada halaman Home:", error);
    books = [];
    isError = true;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900">
      <Navbar user={user ?? undefined} />
      <main className="flex-1">
        <Hero user={user ?? undefined} book={books} />
        <section className="py-8 md:py-12">
          <div className="mx-auto lg:px-4 sm:px-6 px-2">
            <div className="mb-8 flex items-center gap-3">
              <Clock className="h-6 w-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Recently Updated
              </h2>
            </div>
            <List books={books} />
          </div>
        </section>

        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        <section className="py-8 md:py-12">
          <div className="mx-auto px-4">
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
