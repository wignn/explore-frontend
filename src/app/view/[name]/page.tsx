import NovelDetails from "@/components/book/NovelDetails";
import Navbar from "@/components/Navbar";
import { authOptions } from "@/lib/auth";
import { apiRequest } from "@/lib/Request";
import { denormalizeTitle } from "@/lib/utils";
import { bookInterface, bookmark } from "@/types/book";
import {UserInterface } from "@/types/user";
import { getServerSession } from "next-auth";
import React from "react";
interface BookReturnType {
  books: bookInterface[];
  totalBooks: number;
  totalPage: number;
}

async function page({ params }: { params: Promise<{ name?: string }> }) {
  let user: UserInterface | null = null;
  let book = null;
  let popular: bookInterface[] = [];
  let bookmark: bookmark | null = null;
  let session = null;
  const { name } = await params;

  try {
    session = await getServerSession(authOptions);

    const [detailRes, listRes] = await Promise.all([
      apiRequest<{ data: bookInterface }>({
        endpoint: `/book/${denormalizeTitle(name as string)}`,
        method: "GET",
      }),
      apiRequest<{ data: BookReturnType }>({
        endpoint: `/book/list?limit=100&page=1&status=Ongoing`,
        method: "GET",
      }),
    ]);

    const booklist = listRes?.data;

    book = detailRes?.data;

    if (session?.id && session?.backendTokens?.accessToken) {
      const [userRes, bookmarkRes] = await Promise.all([
        apiRequest<{ data: UserInterface }>({
          endpoint: `/user/${session.id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }),
        apiRequest<{ data: bookmark }>({
          endpoint: `/bookmark/isBookmarked/${session.id}/${book.id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }),
      ]);

      user = userRes?.data;
      bookmark = bookmarkRes?.data;
    }


    if (booklist?.books.length) {
      popular = [...booklist.books]
        .filter((book) => book.bookmark?.length > 0)
        .sort((a, b) => (b.bookmark.length || 0) - (a.bookmark?.length || 0))
        .slice(0, 5);
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }

  return (
    <div className="bg-gray-900">
      <Navbar user={user ?? undefined} />
      <div className="bg-gray-900 w-full min-h-screen">
        {book ? (
          <NovelDetails
            book={book}
            Popular={popular}
            userId={session?.id ?? ""}
            accessToken={session?.backendTokens?.accessToken ?? ""}
            Bookmark={bookmark}
          />
        ) : (
          <p className="text-white text-center mt-10">Book not found</p>
        )}
      </div>
    </div>
  );
}

export default page;
