import { Review } from "@app/types/Review";
import { User } from "@app/types/User";
import { Book } from "@app/types/Book";

const mockedUser: User = {
  id: "user-001",
  userName: "booklover",
  fullName: "Ana Clara Silva",
  email: "ana.clara@email.com",
  profileImgUrl: "https://randomuser.me/api/portraits/women/44.jpg",
};

const mockedBooks: Book[] = [
  {
    id: "book-001",
    title: "O Sol é Para Todos",
    authors: ["Harper Lee"],
    year: 1960,
    isbn: "9780061120084",
    genres: ["Romance", "Drama"],
    coverUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    pages: 336,
    description: "Um clássico da literatura americana sobre justiça e racismo.",
    rating: 4.8,
  },
  {
    id: "book-002",
    title: "Dom Casmurro",
    authors: ["Machado de Assis"],
    year: 1899,
    isbn: "9788535910666",
    genres: ["Romance", "Literatura Brasileira"],
    coverUrl: "https://covers.openlibrary.org/b/id/10562601-L.jpg",
    pages: 256,
    description: "Obra-prima de Machado de Assis, explorando ciúme e memória.",
    rating: 4.6,
  },
  {
    id: "book-003",
    title: "1984",
    authors: ["George Orwell"],
    year: 1949,
    isbn: "9780451524935",
    genres: ["Distopia", "Ficção Científica"],
    coverUrl: "https://covers.openlibrary.org/b/id/153541-L.jpg",
    pages: 328,
    description: "Um romance distópico sobre vigilância e totalitarismo.",
    rating: 4.9,
  },
];

export const mockedMyReviews: Review[] = [
  {
    id: "review-001",
    rating: 5,
    comment: "Simplesmente incrível! Uma leitura obrigatória sobre empatia.",
    createdAt: "2025-05-20T14:22:00Z",
    user: mockedUser,
    book: mockedBooks[0],
    has_spoiler: false,
  },
  {
    id: "review-002",
    rating: 4,
    comment: "A escrita do Machado é fascinante. Fiquei na dúvida até o fim!",
    createdAt: "2025-05-21T09:10:00Z",
    user: mockedUser,
    book: mockedBooks[1],
    has_spoiler: true,
  },
  {
    id: "review-003",
    rating: 5,
    comment: "Assustadoramente atual. Recomendo para todos que gostam de distopias.",
    createdAt: "2025-05-22T18:45:00Z",
    user: mockedUser,
    book: mockedBooks[2],
    has_spoiler: false,
  },
];
