import ChapterManagement from '@/components/admin/AdminChapterList'
import { getBookDetail } from '@/lib/action/book'
import React from 'react'

const page = async ({params}: {params: {id: string}}) => {
    let book
    let chapter
    try {
        book = await getBookDetail(params.id)
        chapter = book.Chapter?.map((chapter: any) => ({
            id: chapter.id,
            title: chapter.title,
            description: chapter.description,
            content: chapter.content,
            bookId: chapter.bookId,
            createdAt: chapter.createdAt,
            updatedAt: chapter.updatedAt
        }))
    } catch (error) {
        console.log(error)
    }

    return (
        <div>
        <ChapterManagement chapters={chapter} book={book}/>
        </div>
    )
}

export default page
