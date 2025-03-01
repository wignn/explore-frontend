"use client"
import React from 'react'
import { useRouter } from "next/navigation";
interface Props {
    pageParam: number;
    searchQuery: string;
    isLastPage: boolean;
}


const Prev:React.FC<Props> = ({pageParam,searchQuery, isLastPage}) => {
    
    const router = useRouter();
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || (isLastPage && newPage > pageParam)) return;
        router.push(`?query=${searchQuery}&page=${newPage}`);
    };

  return (
    <div>
        <div className="flex justify-center gap-4 m-4">
                <button
                    onClick={() => handlePageChange(pageParam - 1)}
                    disabled={pageParam <= 1}
                    className={`px-4 py-2 rounded transition duration-300 ease-in-out ${
                        pageParam <= 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    Previous
                </button>
                <span className="text-white">Page {pageParam}</span>
                <button
                    onClick={() => handlePageChange(pageParam + 1)}
                    disabled={isLastPage}
                    className={`px-4 py-2 rounded transition duration-300 ease-in-out ${
                        isLastPage ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    Next
                </button>
            </div>
    </div>
  )
}

export default Prev
