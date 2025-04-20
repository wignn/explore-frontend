import Navbar from "@/components/Navbar";
import ChapterPage from "@/components/view/chapter/Chapter-content";
import { authOptions } from "@/lib/auth";
import { apiRequest } from "@/lib/Request";
import { denormalizeTitle } from "@/lib/utils";
import { bookInterface, Chapter } from "@/types/book";
import { UserInterface } from "@/types/user";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ name: string; chapterId: string }>;
}) {
  const { name } = await params;
  const { chapterId } = await params;

  let chapter;
  let user = null;
  let book = null;
  try {
    const [detailRes, chapterRes] = await Promise.all([
      apiRequest<{ data: bookInterface }>({
        endpoint: `/book/${denormalizeTitle(name as string)}`,
        method: "GET",
      }),

      apiRequest<{ data: Chapter }>({
        endpoint: `/chapter/${chapterId}`,
        method: "GET",
      }),
    ]);
    book = detailRes.data;
    chapter = chapterRes.data;

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
  } catch (error) {
    console.error("Failed to load chapter:", error);
  }

  return (
    <div>
      {chapter && book ? (
        <div>
          <Navbar user={user ?? undefined} />
          <ChapterPage chapter={chapter} book={book} />
        </div>
      ) : (
        <div className="container bg-gray-900 mx-auto p-4 flex flex-col items-center justify-center text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold mt-2">Not Found</h2>
          <p className="text-gray-600 mt-4">
            The chapter or book you&#39;re looking for could not be found.
          </p>

          <Link
            href="/"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Return to Home
          </Link>
        </div>
      )}
    </div>
  );
}
