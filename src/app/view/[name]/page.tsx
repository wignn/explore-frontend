import NovelDetails from '@/components/book/NovelDetails';
import Navbar from '@/components/Navbar';
import { bookList, getBookDetail } from '@/lib/action/book';
import { isBookmark } from '@/lib/action/bookmark';
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { denormalizeTitle } from '@/lib/utils';
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

async function page({ params }: { params: { name?: string } }) {
  let user = null;
  let book = null;
  let popular: PopularProps[] = [];
  let bookmark = null;
  let session = null;
  

  try {
    const bookName = params.name ?? "";
    session = await getServerSession(authOptions);

  book = await getBookDetail(denormalizeTitle(bookName));
  const booklist = await bookList();
  
  if (session?.id && session?.backendTokens?.accessToken) {
    user = await getProfile(session.id, session.backendTokens.accessToken);
    bookmark = await isBookmark(session.id, book.id, session.backendTokens.accessToken);
  }

    if (booklist?.length) {
      popular = booklist
        .sort((a: PopularProps, b: PopularProps) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5) as PopularProps[];
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