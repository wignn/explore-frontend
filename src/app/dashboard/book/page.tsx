import AdminBookList from '@/components/admin/BookAdmin';
import { bookList } from '@/lib/action/book';
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import { UserInterface } from '@/types/user';
import { bookInterface } from '@/types/book'; 

async function page() {
    let user: UserInterface | null = null;
    let book: bookInterface[] = [];

    const session = await getServerSession(authOptions);

    try {

        if (session?.id && session?.backendTokens?.accessToken) {
            [user, book] = await Promise.all([
                getProfile(session.id, session.backendTokens.accessToken),
                bookList()
            ]);
        }
    } catch (error) {
        console.error('Error fetching user or books:', error);
    }

    if (!user) return null; 

    return (
        <div>
            <AdminBookList  book={book} accesToken={session?.backendTokens.accessToken as string}/>
        </div>
    );
}

export default page;
