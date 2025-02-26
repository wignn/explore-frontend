export type bookInterface = {
  
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  updatedAt: string;
  popular: boolean;
  genre: Genre[];
  Chapter: Chapter[];
  createdAt: string;
};


interface Genre {
  id: string;
  title: string;
}
