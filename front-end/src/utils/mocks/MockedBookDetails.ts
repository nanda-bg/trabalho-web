import { Book } from "@app/types/Book";
import { Review } from "@app/types/Review";

const book: Book = {
  id: "1",
  title: "The Great Gatsby",
  authors: ["F. Scott Fitzgerald", "Zelda Fitzgerald"],
  year: 1925,
  isbn: "978-0743273565",
  genres: [
    "Classic",
    "Modernist",
    "Tragedy",
    "Social Satire",
    "Realism",
    "American Literature",
  ],
  coverUrl:
    "https://cdn.kobo.com/book-images/5addc4c9-fbc1-42d7-a79f-cec7619d4b23/1200/1200/False/the-great-gatsby-a-novel-1.jpg",
  pages: 218,
  description: `Set in the dazzling Jazz Age of 1920s New York, The Great Gatsby is F. Scott Fitzgerald’s third novel and is widely regarded as a masterpiece of American literature. Narrated by Nick Carraway, a Yale graduate from the Midwest, the story follows his experiences after moving to Long Island’s West Egg, where he becomes entangled in the lavish world of his enigmatic neighbor, Jay Gatsby. Gatsby, a self-made millionaire known for his extravagant parties and mysterious past, is driven by his obsessive love for Daisy Buchanan, a beautiful socialite now married to the wealthy and brutish Tom Buchanan. As Gatsby attempts to rekindle their romance, the novel explores themes of wealth, class, obsession, betrayal, and the elusive nature of the American Dream. Through its vivid depiction of opulence and moral decay, The Great Gatsby offers a poignant critique of the era’s excesses and the tragic consequences of idealism. The novel’s rich symbolism, complex characters, and lyrical prose have cemented its status as a quintessential work of modernist fiction and a powerful social satire, capturing both the glamour and the underlying emptiness of the Roaring Twenties.`,
};

const reviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment: "Excelente leitura, altamente recomendada.",
    createdAt: "2025-04-15T10:30:00Z",
    user: {
      id: "u1",
      userName: "sarah_johnson",
      fullName: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
  {
    id: "2",
    rating: 4,
    comment: "Boa leitura com bons momentos e personagens interessantes.",
    createdAt: "2025-03-22T16:45:00Z",
    user: {
      id: "u2",
      userName: "michael_chen",
      fullName: "Michael Chen",
      email: "michael.chen@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
  {
    id: "3",
    rating: 5,
    comment: "Excelente leitura, altamente recomendada.",
    createdAt: "2025-02-10T08:30:00Z",
    user: {
      id: "u3",
      userName: "emma_wilson",
      fullName: "Emma Wilson",
      email: "emma.wilson@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
  {
    id: "4",
    rating: 5,
    comment: "Excelente leitura, altamente recomendada.",
    createdAt: "2025-04-01T12:05:00Z",
    user: {
      id: "u4",
      userName: "daniel_smith",
      fullName: "Daniel Smith",
      email: "daniel.smith@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
  {
    id: "5",
    rating: 5,
    comment: "Excelente leitura, altamente recomendada.",
    createdAt: "2025-03-05T18:40:00Z",
    user: {
      id: "u5",
      userName: "lucas_martins",
      fullName: "Lucas Martins",
      email: "lucas.martins@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
  {
    id: "6",
    rating: 5,
    comment: "Excelente leitura, altamente recomendada.",
    createdAt: "2025-01-28T14:15:00Z",
    user: {
      id: "u6",
      userName: "ana_silva",
      fullName: "Ana Silva",
      email: "ana.silva@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
  {
    id: "7",
    rating: 3,
    comment: "Leitura razoável, com alguns pontos positivos e negativos.",
    createdAt: "2025-02-20T09:55:00Z",
    user: {
      id: "u7",
      userName: "peter_kim",
      fullName: "Peter Kim",
      email: "peter.kim@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
  {
    id: "8",
    rating: 4,
    comment: "Boa leitura com bons momentos e personagens interessantes.",
    createdAt: "2025-03-12T11:10:00Z",
    user: {
      id: "u8",
      userName: "julie_roberts",
      fullName: "Julie Roberts",
      email: "julie.roberts@example.com",
      profileImgUrl: "https://i.pravatar.cc/300",
    },
    book,
  },
];


export const bookDetails = {
  ...book,
  reviews: reviews,
  rating: 4.5,
};
