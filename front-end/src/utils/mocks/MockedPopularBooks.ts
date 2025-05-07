import { Book } from "@app/types/Book";

export const mockedPopularBooks: Book[] = [
  {
    id: "456",
    title: "O Mistério da Lua Azul",
    authors: ["João Escritor"],
    year: 2024,
    isbn: "978-3-16-148410-0",
    genres: ["Ficção Científica"],
    coverUrl: "https://m.media-amazon.com/images/I/51bVzIpFHaL.jpg",
    pages: 320,
    description:
      "Uma aventura fascinante que explora os mistérios do universo. Uma narrativa envolvente e cheia de reviravoltas.",
  },
  {
    id: "789",
    title: "Sombras do Passado",
    authors: ["Ana Escritora"],
    year: 2023,
    isbn: "978-3-16-148410-1",
    genres: ["Suspense"],
    coverUrl:
      "https://m.media-amazon.com/images/I/815l8spEw8L._AC_UF1000,1000_QL80_.jpg",
    pages: 280,
    description:
      "Um suspense psicológico que prende o leitor a cada página. Segredos obscuros vêm à tona em uma trama cheia de tensão.",
  },
  {
    id: "101",
    title: "Revolução Quântica",
    authors: ["Dra. Sofia Cientista"],
    year: 2025,
    isbn: "978-3-16-148410-2",
    genres: ["Ciência"],
    coverUrl:
      "https://m.media-amazon.com/images/I/41N3BYqKVIL._AC_UF1000,1000_QL80_.jpg",
    pages: 400,
    description:
      "Uma obra revolucionária que explica conceitos complexos da física quântica de forma acessível e instigante.",
  },
  {
    id: "202",
    title: "O Labirinto dos Sonhos",
    authors: ["Miguel Sonhador"],
    year: 2024,
    isbn: "978-3-16-148410-3",
    genres: ["Fantasia"],
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0EvVfVEhtJBSAivCnT8Ue24qG93Pf27JIQ&s",
    pages: 350,
    description:
      "Uma jornada mágica através de um mundo de sonhos e pesadelos. Uma história que desafia a imaginação.",
  },
  {
    id: "303",
    title: "Amor nos Tempos da Revolução",
    authors: ["Isabel Historiadora"],
    year: 2023,
    isbn: "978-3-16-148410-4",
    genres: ["Romance Histórico"],
    coverUrl:
      "https://m.media-amazon.com/images/I/61ocjPqNlIL._UF894,1000_QL80_.jpg",
    pages: 450,
    description:
      "Um romance épico ambientado em tempos de revolução. Uma história de amor, coragem e sacrifício.",
  },
];
