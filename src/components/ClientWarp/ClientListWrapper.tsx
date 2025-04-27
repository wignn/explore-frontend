"use client";

import dynamic from "next/dynamic";
import { bookInterface } from "@/types/book";
import { BookListSkeleton } from "@/components/loading/skletonBookList";

const List = dynamic(() => import("@/components/view/List"), {
  ssr: false,
  loading: () => <BookListSkeleton />,
});

export default function ClientListWrapper({ books }: { books: bookInterface[] }) {
  return <List books={books} />;
}
