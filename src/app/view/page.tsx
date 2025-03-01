import List, { BookListSkeleton } from "@/components/List";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonNavbar from "@/components/loading/skletonNavbar";
import SekletonSearch from "@/components/loading/sekletonSearch";
import { bookSearch } from "@/lib/action/book";
import { bookInterface } from "@/types/book";
import { Suspense } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProfile } from "@/lib/action/user";
import Prev from "@/components/view/Prev";

interface SearchParams {
    query?: string;
    page?: number;
}

const Page = async ({ searchParams }: { searchParams?: SearchParams }) => {
    const searchQuery = searchParams?.query ?? "";
    const pageParam = parseInt(searchParams?.page?.toString() ?? "1", 10);
    const limit = 10;
    const session = await getServerSession(authOptions)
    let user =  null
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
        <div className="bg-gray-900 min-h-screen">
            <Suspense fallback={<SkeletonNavbar />}>
                <Navbar user={user} />
            </Suspense>

            <Suspense fallback={<SekletonSearch />}>
                <SearchBar />
            </Suspense>

            <Suspense fallback={<BookListSkeleton />}>
                <div className="w-full min-h-screen px-0 md:px-10">
                    {paginatedBooks.length > 0 ? (
                        <List books={paginatedBooks} text="Book List" />
                    ) : (
                        <p className="text-white text-center mt-10">📚 Tidak ada buku yang ditemukan.</p>
                    )}
                </div>
            </Suspense>

                <Prev pageParam={pageParam} isLastPage={isLastPage} searchQuery={searchQuery} />

            <Footer />
        </div>
    );
};

export default Page;
