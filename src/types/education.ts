export interface EducationalContent {
    id: string;
    type: 'article' | 'video' | 'quiz' | 'infographic';
    title: string;
    description: string;
    content: string;
    thumbnail?: string;
    category: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    published: boolean;
    videoUrl?: string;
    readTime?: string;
    questions?: QuizQuestion[];
  }
  
  export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
  }