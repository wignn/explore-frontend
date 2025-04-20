
"use client";

import { bookList, getBookDetail } from "@/lib/action/book";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import NovelDetails from "@/components/book/NovelDetails";
import { useSession } from "next-auth/react";
import { getProfile } from "@/lib/action/user";
import { NavbarProps } from "@/types/user";
import SkeletonNavbar from "@/components/loading/skletonNavbar";
import { isBookmark } from "@/lib/action/bookmark";
import { bookInterface, bookmark } from "@/types/book";

function BookDetails() {
  const [book, setBook] = useState<bookInterface | null>(null);
  const pathname = usePathname();
  const [user, setUser] = useState<NavbarProps['user'] | undefined>(undefined);
  const [popular, setPopular] = useState<bookInterface[]>([]);
  const [isBooksLoading, setIsBooksLoading] = useState(true);
  const [bookmark, setBookmark] = useState<bookmark| null>(null)
  const session = useSession();
  const bookName = useMemo(() => pathname.split("/")[2].replaceAll("-", " "), [pathname]);

  useEffect(() => {
    if (!session.data?.user) {
      console.warn("Session belum tersedia!");
      return;
    }
  
    const fetchData = async () => {
      try {
        const { id, backendTokens } = session.data;
        const token = backendTokens?.accessToken;
  
        const [userData, bookData, bookListData] = await Promise.all([
          id && token ? getProfile(id, token) : null,
          getBookDetail(bookName),
          bookList({limit:5, page: 1, status:"Ongoing"}) || [],
         
        ]);
  
        const bookmark = await isBookmark(id, bookData.id, token)
        if (bookmark !== undefined) {
          setBookmark(bookmark)
        }
        setUser(userData);
        setBook(bookData);
  
        if (bookListData?.books.length) {
          const sortedBooks = bookListData.books
                .sort((a: bookInterface, b: bookInterface) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 5);
          setPopular(sortedBooks);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsBooksLoading(false);
      }
    };
  
    fetchData();
  });
  
  return (
    <div className="bg-gray-900">
      {isBooksLoading ? <SkeletonNavbar /> : <Navbar user={user} />}
      <div className="bg-gray-900 w-full min-h-screen">
      {!isBooksLoading && <NovelDetails book={book as bookInterface} Popular={popular} userId={session?.data?.id as string} accessToken={session?.data?.backendTokens.accessToken as string} Bookmark={bookmark} />}
      </div>
    </div>
  );
}

export default BookDetails;
