import List, { BookListSkeleton } from "@/components/List";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonNavbar from "@/components/loading/skletonNavbar";
import SekletonSearch from "@/components/loading/sekletonSearch";
import { bookSearch } from "@/lib/action/book";
import type { bookInterface } from "@/types/book";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProfile } from "@/lib/action/user";
import Prev from "@/components/view/Prev";
import { Search, BookOpen, AlertCircle, Link } from "lucide-react";

interface SearchParams {
  query?: string;
  page?: number;
}

const Page = async (props: { searchParams?: Promise<SearchParams> }) => {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.query ?? "";
  const pageParam = Number.parseInt(searchParams?.page?.toString() ?? "1", 10);
  const limit = 12;
  const session = await getServerSession(authOptions);
  let user = null;
  if (session?.id && session?.backendTokens?.accessToken) {
    user = await getProfile(session.id, session.backendTokens.accessToken);
  }

  const allBooks = await bookSearch();

  const filteredBooks = searchQuery
    ? allBooks.filter((book: bookInterface) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allBooks;

  const startIndex = (pageParam - 1) * limit;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + limit);
  const isLastPage = startIndex + limit >= filteredBooks.length;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,200,200,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,200,200,0.05),transparent_70%)]"></div>
      </div>

      <Suspense fallback={<SkeletonNavbar />}>
        <Navbar user={user} />
      </Suspense>

      <main className="flex-1 relative z-10">
        <section className="relative py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                Find Your Next Adventure
              </h1>
              <p className="mb-8 text-gray-400">
                Search our collection of books and discover your next favorite
                story
              </p>

              <Suspense fallback={<SekletonSearch />}>
                <div className="mx-auto max-w-2xl">
                  <SearchBar />
                </div>
              </Suspense>
            </div>
          </div>
        </section>

        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {searchQuery && (
              <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-gray-800/50 px-4 py-3 text-center backdrop-blur-sm md:justify-start">
                <Search className="h-4 w-4 text-teal-400" />
                <p className="text-sm text-gray-300 md:text-base">
                  <span className="font-medium text-teal-400">
                    &quot;{searchQuery}&quot;
                  </span>
                </p>
              </div>
            )}

            <Suspense fallback={<BookListSkeleton />}>
              {paginatedBooks.length > 0 ? (
                <List books={paginatedBooks} />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800/50 py-16 px-4 text-center backdrop-blur-sm">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-700/50 backdrop-blur-sm">
                    <AlertCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <h2 className="mb-2 text-xl font-medium text-gray-300">
                    No books found
                  </h2>
                  <p className="mb-6 max-w-md text-gray-500">
                    {searchQuery
                      ? `We couldn't find any books matching "${searchQuery}". Try a different search term or browse our collection.`
                      : "There are no books available at the moment. Please check back later."}
                  </p>
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2 font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl hover:shadow-teal-500/30"
                  >
                    <BookOpen className="h-4 w-4" />
                    Browse All Books
                  </Link>
                </div>
              )}
            </Suspense>

            {paginatedBooks.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Prev
                  pageParam={pageParam}
                  isLastPage={isLastPage}
                  searchQuery={searchQuery}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
