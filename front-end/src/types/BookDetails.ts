import { Book } from './Book';
import { Review } from './Review';

export type BookDetails = Book & {
    reviews: Review[];
    rating: number;
};