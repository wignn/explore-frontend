import ChapterManagement from '@/components/admin/AdminChapterList'
import { apiRequest } from '@/lib/Request'
import { bookInterface, Chapter } from '@/types/book'
import React from 'react'


const page = async ({params}: {params: Promise <{id: string}>}) => {
    let book: bookInterface | undefined
    let chapters: Chapter[] = []
    const {id} = await params
    try {
       const res = await apiRequest<{ data: bookInterface}>({
            endpoint: `/book/${id}`,
            method: "GET",
        })
    
        book = res.data

        chapters = book.chapter?.map((chapter) => ({
            id: chapter.id,
            title: chapter.title,
            description: chapter.description,
            content: chapter.content,
            bookId: chapter.bookId,
            chapterNum: chapter.chapterNum,
            createdAt: chapter.createdAt,
            updatedAt: chapter.updatedAt
        })) || []
    } catch (error) {
        console.log(error)
    }

   if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div>
        <ChapterManagement chapters={chapters} book={book}/>
        </div>
    )
}

export default page
