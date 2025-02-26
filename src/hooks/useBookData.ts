import { useEffect, useState, useCallback } from "react";
import { bookList, getBookDetail } from "@/lib/action/book";
import { getProfile } from "@/lib/action/user";
import { isBookmark } from "@/lib/action/bookmark";
import { useSession } from "next-auth/react";

type Genre = {
    Genre: {
      id: string;
      title: string;
    };
  };
  type Chapter = {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    description: string;
  };
  interface BookProps {
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
  interface PopularProps {
    id: string;
    title: string;
    cover: string;
    description: string;
    author: string;
    updatedAt: string;
    popular: boolean;
    genre: {
      id: string;
      title: string;
    }[];
    Chapter: Chapter[];
    createdAt: string;
    bookmark: boolean;
  }

export function useBookData(bookName: string) {
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState<any>(null);
  
  const session = useSession();
  
  const fetchData = useCallback(async () => {
    if (!session.data?.user) return;

    try {
      const { id, backendTokens } = session.data;
      const token = backendTokens?.accessToken;
      
      const [userData, bookData, bookListData] = await Promise.all([
        id && token ? getProfile(id, token) : null,
        getBookDetail(bookName),
        bookList(),
      ]);

      setUser(userData);
      setBook(bookData);
      setBookmark(id && token ? await isBookmark(id, bookData.id, token) : null);

      if (bookListData?.length) {
        setPopular(
          bookListData.sort((a:any, b:any) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5)
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [bookName, session.data?.user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

interface BookmarkData {
    id: string;
    userId: string;
    bookId: string;
    createdAt: string;
}

interface UseBookDataReturn {
    book: BookProps | null;
    user: any;
    popular: PopularProps[];
    isLoading: boolean;
    bookmark: BookmarkData | null;
}

return { book, user, popular, isLoading, bookmark } as UseBookDataReturn;
}
