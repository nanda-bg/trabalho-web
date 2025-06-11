export interface Book {
  bookId: string;
  title: string;
  description: string;
  authors: string[];
  coverUrl: string;
  publicationYear: number;
  genre: string;
  averageRating: number;
  ratingsCount: number;
  pagesCount: number;
}
