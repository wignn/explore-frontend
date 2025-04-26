import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiRequest } from "@/lib/Request";
import { bookInterface } from "@/types/book";
import { UserInterface } from "@/types/user";
import HomeClient from "./Home";

export default async function Home() {
  let user = null;
  let books: bookInterface[] = [];
  let isError = false;

  try {
    const session = await getServerSession(authOptions);
    if (session?.id && session?.backendTokens?.accessToken) {
      const resProfile = await apiRequest<{ data: UserInterface }>({
        endpoint: `/user/${session.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
      });
      user = resProfile?.data;
    }

    const res = await apiRequest<{ data: { books: bookInterface[] } }>({
      endpoint: "/book/list?limit=12&page=1&status=Ongoing",
      method: "GET",
    });

    books = res?.data?.books ?? [];
  } catch (error) {
    console.error("Error on Home page:", error);
    isError = true;
  }

  return <HomeClient user={user ?? undefined} books={books} isError={isError} />;
}

export function generateMetadata() {
  return {
    title: "Home",
  };
}