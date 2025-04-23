'use client';

import dynamic from 'next/dynamic';
import { bookInterface } from '@/types/book';
import { UserInterface } from '@/types/user';
import { BookListSkeleton } from '@/components/List';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: true });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: true });
const List = dynamic(() => import('@/components/List'), {
    ssr: false,
    loading: () => <BookListSkeleton />,
  });
  const Rank = dynamic(() => import('@/components/Rank'), {
    ssr: false,
    loading: () => <BookListSkeleton />,
  });
  
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function HomeClient({
  user,
  books,
  isError,
}: {
  user?: UserInterface;
  books: bookInterface[];
  isError: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900">
      <Navbar user={user} />
      <main className="flex-1">
        <Hero user={user} book={books} />
        <section className="py-8 md:py-12">
          <div className="mx-auto lg:px-4 sm:px-6 px-2">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Recently Updated
              </h2>
            </div>
            <List books={books} />
          </div>
        </section>

        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        <section className="py-8 md:py-12">
          <div className="mx-auto px-4">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Trending Books
              </h2>
            </div>
            {isError ? (
              <div className="rounded-xl bg-gray-800/50 p-8 text-center backdrop-blur-sm">
                <p className="text-gray-400">
                  There was an error loading the trending books.
                </p>
              </div>
            ) : (
              <Rank books={books} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
