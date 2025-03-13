import NovelDetails from '@/components/book/NovelDetails';
import Navbar from '@/components/Navbar';
import { bookList, getBookDetail } from '@/lib/action/book';
import { isBookmark } from '@/lib/action/bookmark';
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { denormalizeTitle } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react';

type Genre = {
  id: string;
  title: string;
};

type Chapter = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  description: string;
  chapterNum: number;
};


interface PopularProps {
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  updatedAt: string;
  popular: boolean;
  genre: Genre[];
  Chapter: Chapter[];
  createdAt: string;
}
interface Bookmark {
  id: string;
  bookId: string;
  userId: string;
}

async function page({ params }: { params: Promise<{ name?: string }> }) {
  let user = null;
  let book = null;
  let popular: PopularProps[] = [];
  let bookmark: Bookmark | null = null;
  let session = null;
  const { name } = await params

  try {

    session = await getServerSession(authOptions);

    book = await getBookDetail(denormalizeTitle(name as string));
    const booklist = await bookList({ page: 1, limit: 100, status: "Ongoing" });

    if (session?.id && session?.backendTokens?.accessToken) {
      user = await getProfile(session.id, session.backendTokens.accessToken);
      bookmark = await isBookmark(user.id, book.id, session.backendTokens.accessToken ) as Bookmark
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
      <Navbar user={user} />
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