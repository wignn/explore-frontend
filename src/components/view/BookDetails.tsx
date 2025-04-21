"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import NovelDetails from "@/components/book/NovelDetails";
import { useSession } from "next-auth/react";
import { NavbarProps, UserInterface } from "@/types/user";
import SkeletonNavbar from "@/components/loading/skletonNavbar";
import { bookInterface, bookmark } from "@/types/book";
import { apiRequest } from "@/lib/Request";

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
          id && token ? 
          apiRequest<UserInterface>({
            endpoint: `/user/${id}`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }) : null,
          await apiRequest<bookInterface>({
            endpoint: `/book/${bookName}`,
            method: "GET", 
          })
          ,
        await apiRequest<{ books: bookInterface[]; totalBooks: number; totalPage: number }>({
            endpoint: `/book/list?limit=100&page=1&status=Ongoing`,
            method: "GET",

        })
         
        ]);
  
  
        const bookmark = await apiRequest<bookmark>({
          endpoint: `/bookmark/isBookmarked/${id}/${bookData.id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (bookmark !== undefined) {
          setBookmark(bookmark)
        }

        setUser(userData ?? undefined);
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
