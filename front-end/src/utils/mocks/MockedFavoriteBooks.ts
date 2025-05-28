import { Book } from "@app/types/Book";

export const mockedFavoriteBooks: Book[] = [
  {
    id: "1",
    title: "O Hobbit",
    authors: ["J.R.R. Tolkien"],
    year: 1937,
    isbn: "978-3-16-148410-0",
    genres: ["Fantasia"],
    coverUrl: "https://m.media-amazon.com/images/I/91M9xPIf10L.jpg",
    rating: 4.8,
    pages: 310,
    description: "Uma jornada inesperada através da Terra-média"
  },
  {
    id: "2",
    title: "Duna",
    authors: ["Frank Herbert"],
    year: 1965,
    isbn: "978-3-16-148410-1", 
    genres: ["Ficção Científica"],
    coverUrl: "https://m.media-amazon.com/images/I/81zN7udGRUL.jpg",
    rating: 4.7,
    pages: 604,
    description: "Epopeia interestelar sobre poder e ecologia"
  },
  {
    id: "3",
    title: "1984",
    authors: ["George Orwell"],
    year: 1949,
    isbn: "978-3-16-148410-2",
    genres: ["Distopia"],
    coverUrl: "https://m.media-amazon.com/images/I/61t0bwt1s3L._AC_UF1000,1000_QL80_.jpg",
    rating: 4.6,
    pages: 328,
    description: "Visão sombria de um regime totalitário"
  },
  {
    id: "4",
    title: "Cem Anos de Solidão",
    authors: ["Gabriel García Márquez"],
    year: 1967,
    isbn: "978-3-16-148410-3",
    genres: ["Realismo Mágico"],
    coverUrl: "https://images.tcdn.com.br/img/img_prod/937309/cem_anos_de_solidao_67133_1_9668ae549598b481a408e00e3dc7dfbe.jpg",
    rating: 4.5,
    pages: 417
  },
  {
    id: "5",
    title: "Crime e Castigo",
    authors: ["Fiódor Dostoiévski"],
    year: 1866,
    isbn: "978-3-16-148410-4",
    genres: ["Clássico"],
    coverUrl: "https://m.media-amazon.com/images/I/916WkSH4cGL.jpg",
    rating: 4.4,
    pages: 551
  },
  {
    id: "6",
    title: "O Pequeno Príncipe",
    authors: ["Antoine de Saint-Exupéry"],
    year: 1943,
    isbn: "978-3-16-148410-5",
    genres: ["Fábula"],
    coverUrl: "https://m.media-amazon.com/images/I/61ATa0Pc4AL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9,
    pages: 96,
    description: "Clássico atemporal sobre amizade e humanidade"
  }
];
