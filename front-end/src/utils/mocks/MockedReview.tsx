import { Review } from "@app/types/Review";

export const mockedReviews: Review[] = [
  {
    id: "rev123456",
    rating: 4.5,
    comment:
      "Um livro fascinante que me manteve envolvido do início ao fim. A narrativa é cativante e os personagens são bem desenvolvidos.",
    createdAt: "2025-03-20T14:30:00Z",
    user: {
      id: "user789",
      userName: "leitor_ávido",
      fullName: "Maria Silva",
      email: "maria.silva@email.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book: {
      id: "book456",
      title: "O Mistério da Lua Azul",
      authors: ["João Escritor"],
      year: 2024,
      isbn: "978-3-16-148410-0",
      genres: ["Ficção Científica"],
      coverUrl: "https://m.media-amazon.com/images/I/51bVzIpFHaL.jpg",
    },
  },
  {
    id: "rev234567",
    rating: 3.5,
    comment:
      "Uma leitura interessante, mas um pouco previsível. O autor tem um estilo agradável, mas a trama poderia ser mais elaborada.",
    createdAt: "2025-03-22T10:15:00Z",
    user: {
      id: "user456",
      userName: "critico_literario",
      fullName: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      profileImgUrl: "https://i.pravatar.cc/301",
    },
    book: {
      id: "book789",
      title: "Sombras do Passado",
      authors: ["Ana Escritora"],
      year: 2023,
      isbn: "978-3-16-148410-1",
      genres: ["Suspense"],
      coverUrl: "https://m.media-amazon.com/images/I/815l8spEw8L._AC_UF1000,1000_QL80_.jpg",
    },
  },
  {
    id: "rev345678",
    rating: 5.0,
    comment:
      "Simplesmente incrível! Este livro mudou minha perspectiva sobre o tema. A pesquisa do autor é impressionante e a escrita é envolvente.",
    createdAt: "2025-03-23T18:45:00Z",
    user: {
      id: "user123",
      userName: "amante_de_livros",
      fullName: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      profileImgUrl: "https://i.pravatar.cc/302",
    },
    book: {
      id: "book101",
      title: "Revolução Quântica",
      authors: ["Dra. Sofia Cientista"],
      year: 2025,
      isbn: "978-3-16-148410-2",
      genres: ["Ciência"],
      coverUrl: "https://m.media-amazon.com/images/I/41N3BYqKVIL._AC_UF1000,1000_QL80_.jpg",
    },
  },
  {
    id: "rev456789",
    rating: 2.0,
    comment:
      "Decepcionante. O livro promete muito, mas entrega pouco. A história é confusa e os personagens são rasos.",
    createdAt: "2025-03-24T09:30:00Z",
    user: {
      id: "user234",
      userName: "leitor_exigente",
      fullName: "Ana Rodrigues",
      email: "ana.rodrigues@email.com",
      profileImgUrl: "https://i.pravatar.cc/303",
    },
    book: {
      id: "book202",
      title: "O Labirinto dos Sonhos",
      authors: ["Miguel Sonhador"],
      year: 2024,
      isbn: "978-3-16-148410-3",
      genres: ["Fantasia"],
      coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0EvVfVEhtJBSAivCnT8Ue24qG93Pf27JIQ&s",
    },
  },
  {
    id: "rev567890",
    rating: 4.0,
    comment:
      "Uma ótima leitura para quem gosta de romance histórico. A autora fez um trabalho excelente na recriação da época.",
    createdAt: "2025-03-24T14:20:00Z",
    user: {
      id: "user345",
      userName: "historia_viva",
      fullName: "Juliana Santos",
      email: "juliana.santos@email.com",
      profileImgUrl: "https://i.pravatar.cc/304",
    },
    book: {
      id: "book303",
      title: "Amor nos Tempos da Revolução",
      authors: ["Isabel Historiadora"],
      year: 2023,
      isbn: "978-3-16-148410-4",
      genres: ["Romance Histórico"],
      coverUrl: "https://m.media-amazon.com/images/I/61ocjPqNlIL._UF894,1000_QL80_.jpg",
    },
  },
];
