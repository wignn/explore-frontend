import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiRequest } from "@/lib/Request";
import { bookInterface } from "@/types/book";
import { UserInterface } from "@/types/user";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ClientListWrapper from "@/components/ClientWarp/ClientListWrapper";
import Navbar from "@/components/Navbar";
import Rank from "@/components/Rank";

export default async function Home() {
  let user = null;
  let books: bookInterface[] = [];
  let isError = false;

  try {
    const session = await getServerSession(authOptions);
    if (session?.id && session?.backendTokens?.accessToken) {
      const resProfile = await apiRequest<{ data: UserInterface }>({
        endpoint: `/user/${session.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
      });
      user = resProfile?.data;
    }

    const res = await apiRequest<{ data: { books: bookInterface[] } }>({
      endpoint: "/book/list?limit=12&page=1&status=Ongoing",
      method: "GET",
    });

    books = res?.data?.books ?? [];
  } catch (error) {
    console.error("Error on Home page:", error);
    isError = true;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900">
    <Navbar user={user ?? undefined} />
    <main className="flex-1">
      <Hero user={user ?? undefined} book={books} />

      <section className="py-8 md:py-12">
        <div className="mx-auto lg:mx-12 lg:px-4 sm:px-6 px-2">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Recently Updated
            </h2>
          </div>
          <ClientListWrapper books={books} />
        </div>
      </section>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      <section className="py-8 md:py-12">
        <div className="mx-auto px-4">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="lg:mx-12 text-2xl font-bold text-white md:text-3xl">
              Trending Books
            </h2>
          </div>
          {isError ? (
            <div className="rounded-xl bg-gray-800/50 p-8 text-center backdrop-blur-sm">
              <p className="text-gray-400">
                There was an error loading the trending books.
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
  )
}

export function generateMetadata() {
  return {
    title: "Home",
  };
}