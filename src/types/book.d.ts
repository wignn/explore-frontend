

type Genre = {
  id: string;
  title: string;
};

enum Language {
  English = "English",
  Japanese = "Japanese",
  Korean = "Korean",
}

enum BookStatus {
  Completed = "Completed",
  Drop = "Drop",
  Ongoing = "Ongoing",
}

export interface bookmark {
  id: string;
  bookId: string;
  userId: string;
}


interface Chapter {
  bookId: string;
  id: string
  title: string
  description: string
  content: string
  updatedAt: string
  chapterNum: number
  createdAt: string
}

export type bookInterface = {
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  updatedAt: string;
  popular: boolean;
  genre: Genre[];
  chapter: Chapter[];
  createdAt: string;
  realaseDate: number;
  status: BookStatus;
  language: Language;
  bookmark: bookmark[];
};



export interface BookParams {
  page?: number;
  limit?: number;
  status?: string;
  genre?: string[];
  language?: string;
  author?: string;
  title?: string;
}
