"use client";

import { getProfile } from "@/lib/action/user";
import { getSession } from "next-auth/react";
import { bookSearch } from "@/lib/action/book";
import List, { BookListSkeleton } from "@/components/List";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bookInterface } from "@/types/book";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SkeletonNavbar from "@/components/loading/skletonNavbar";
import dynamic from "next/dynamic";
import SekletonSearch from "@/components/loading/sekletonSearch";
const select = dynamic(() => import("react-select"), { ssr: false });

export default function Page() {
    const [user, setUser] = useState<any>(null);
    const [books, setBooks] = useState<bookInterface[]>([]);
    const [isBooksLoading, setIsBooksLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);

    const limit = 10;
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const queryParam = searchParams.get("query") || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const session = await getSession();

                const [userData, bookData] = await Promise.all([
                    session?.id && session?.backendTokens?.accessToken
                        ? getProfile(session.id, session.backendTokens.accessToken)
                        : null,
                    bookSearch(queryParam, pageParam, limit)
                ]);

                setUser(userData !== "unauthorized" ? userData : null);
                setBooks(bookData || []);
                setIsLastPage(bookData.length < limit);
            } catch (error) {
                console.error("❌ Error fetching data:", error);
                setUser(null);
                setBooks([]);
            } finally {
                setIsBooksLoading(false);
                setIsFirstLoad(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!isFirstLoad) {
            setIsBooksLoading(true);
            const fetchBooks = async () => {
                try {
                    const bookData = await bookSearch(queryParam, pageParam, limit);
                    setBooks(bookData || []);
                    setIsLastPage(bookData.length < limit);
                } catch (error) {
                    console.error("❌ Error fetching books:", error);
                    setBooks([]);
                } finally {
                    setIsBooksLoading(false);
                }
            };

            fetchBooks();
        }
    }, [queryParam, pageParam]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1) return; 
        router.replace(`?query=${queryParam}&page=${newPage}`);
    };

    return (
        <div className="bg-gray-900 min-h-screen">   
            {isFirstLoad ? <SkeletonNavbar /> : <Navbar user={user} />}

            {isFirstLoad ? <SekletonSearch /> : <SearchBar />}
            <div className="w-full min-h-screen px-0 md:px-10">
            {isBooksLoading ? <BookListSkeleton /> : <List books={books} text="Book List" />}
            </div>
            <div className="flex justify-center gap-4 m-4">
                <button 
                    onClick={() => handlePageChange(pageParam - 1)} 
                    disabled={pageParam <= 1}
                    className={`px-4 py-2 rounded transition duration-300 ease-in-out ${
                        pageParam <= 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    Previous
                </button>
                <span className="text-white">Page {pageParam}</span>
                <button 
                    onClick={() => handlePageChange(pageParam + 1)} 
                    disabled={isLastPage} 
                    className={`px-4 py-2 rounded transition duration-300 ease-in-out ${
                        isLastPage ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    Next
                </button>
            </div>

            <Footer />
        </div>
    );
}