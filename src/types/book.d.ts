export type bookInterface = {
  
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  updatedAt: Date;
  popular: boolean;
  genre: Genre[];
  chapter: Chapter[];
  createdAt: Date;

};



interface Genre {
  id: string;
  title: string;
}
