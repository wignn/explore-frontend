import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Dashboard from "../../components/admin/AdminDasboard";
import { apiRequest } from "@/lib/Request";
interface userData {
  id: string;
  username: string;
  email: string;
  role?: string;
};

interface chapterData {
  id: string;
  title: string;
  bookId: string;
  createdAt: string;
};

interface genreData {
  id: string;
  title: string;
}


interface bookmarkData {
  bookId: string;
}

interface bookData {
  id: string;
  title: string;
  genreId: number;
  genre: { id: string }[];
}
export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const accessToken = session?.backendTokens.accessToken as string;

  const [
    userResponse,
    chapterResponse,
    genreResponse,
    sessionResponse,
    bookmarkResponse,
    bookResponse,
  ] = await Promise.all([
    apiRequest<{ data: userData[] }>({
      endpoint: `/user/${session?.id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

    apiRequest<{ data: chapterData[] }>({
      endpoint: `/admin/chapter`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

    apiRequest<{ data: genreData[] }>({
      endpoint: `/admin/genre`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
    apiRequest<{ data: []}>({
      endpoint: `/admin/user/session`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

    apiRequest<{ data: bookmarkData[] }>({
      endpoint: `/admin/bookmark`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

    apiRequest<{ data: bookData[] }>({
      endpoint: `/admin/book`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  ]);

  const userData = userResponse?.data || [];
  const chapterData = chapterResponse?.data || [];
  const genreData = genreResponse?.data || [];
  const sessionData = sessionResponse?.data || [];
  const bookmarkData = bookmarkResponse?.data || [];
  const bookData = bookResponse?.data || [];

  return (
    <Dashboard
      userData={userData}
      chapterData={chapterData}
      genreData={genreData}
      sessionData={sessionData}
      bookmarkData={bookmarkData}
      bookData={bookData}
    />
  );
}