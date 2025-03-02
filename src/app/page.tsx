import Footer from "@/components/Footer";
import List from "@/components/List";
import Navbar from "@/components/Navbar";
import Rank from "@/components/Rank";
import { getProfile } from "@/lib/action/user";
import { bookList } from "@/lib/action/book";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
    let user = null;
    let books = []; 

    try {
        const session = await getServerSession(authOptions);

        if (session?.id && session?.backendTokens?.accessToken) {
            const profile = await getProfile(session.id, session.backendTokens.accessToken);
            user = profile !== "unauthorized" ? profile : null;
        }

        const allBooks = (await bookList()) || [];
        const sortedBooks = allBooks.sort((a: { updatedAt: string }, b: { updatedAt: string }) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        books = sortedBooks.slice(0, 24); 

    } catch (error) {
        console.error("Error pada halaman Home:", error);
        books = [];
    }

    console.log(books);
    return (
        <div>
            <Navbar user={user} />
            <div className="bg-gray-900 w-full min-h-screen p-0 md:p-10">
                <List books={books} text="Recently Updated" />
                <Rank books={books} />
            </div>
            <Footer />
        </div>
    );
}
