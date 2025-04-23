import AdminBookList from "@/components/admin/BookAdmin";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { UserInterface } from "@/types/user";
import { bookInterface } from "@/types/book";
import { apiRequest } from "@/lib/Request";

interface BookReturnType {
  books: bookInterface[];
  totalBooks: number;
  totalPage: number;
}

async function page() {
  let user: UserInterface | null = null;
  let book: bookInterface[] = [];

  const session = await getServerSession(authOptions);
  try {
    if (session?.id && session?.backendTokens?.accessToken) {
      const [userData, bookData] = await Promise.all([
        await apiRequest<{ data: UserInterface }>({
          endpoint: `/user/${session.id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }),
        apiRequest<{ data: BookReturnType }>({
          endpoint: `/book/list?limit=200&page=1&status=Ongoing`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }),
      ]);
      user = userData.data;
      const bookList = bookData?.data || [];
      book = bookList.books || [];
    }
  } catch (error) {
    console.error("Error fetching user or books:", error);
  }

  if (!user) return null;

  return (
    <div>
      <AdminBookList
        book={book}
        accesToken={session?.backendTokens.accessToken as string}
      />
    </div>
  );
}

export default page;
