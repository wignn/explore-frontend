import ChapterManagement from '@/components/admin/AdminChapterList'
import { getBookDetail } from '@/lib/action/book'
import React from 'react'

interface Chapter {
    id: string
    title: string
    bookId: string
    content: string
    updatedAt: string
    description: string
    chapterNum: number
    createdAt: string
}

const page = async ({params}: {params: {id: string}}) => {
    let book
    let chapter
    const {id} = await params
    try {
        book = await getBookDetail(id)
        chapter = book.Chapter?.map((chapter: Chapter) => ({
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
