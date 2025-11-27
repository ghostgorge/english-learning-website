export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
  isReading?: boolean; // UI state for TTS
}

export interface NewsItem {
  title: string;
  snippet: string;
  url: string;
  source: string;
  publishedTime?: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  definition: string;
  example: string;
}

export interface Sentence {
  id: string;
  text: string;
  translation: string;
}

export type TabView = 'chat' | 'vocab' | 'sentences';