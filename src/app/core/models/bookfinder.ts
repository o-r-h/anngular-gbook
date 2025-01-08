export interface BookFinder {
  total_results: number
  total_pages: number
  results: Result[]
}

export interface Result {
  series_name: string
  title: string
  authors: string[]
  author_first_names: string[]
  author_last_names: string[]
  page_count: number
  canonical_isbn: string
  amazon_url: string
  summary: string
  min_age: number
  max_age: number
  copyright: number
  language: string
  vocab_words: string[]
  categories: string[]
  subcategories: string[]
  subject_tags: string[]
  published_works: PublishedWork[]
  measurements: Measurements
  get shortTitle(): string;
}

export function shortTitle(result: Result): string {
  return  result.title.length > 28 ? result.title.substring(0, 28) + '...' : result.title;
}

export function addShortTitleToResults(results: Result[]): Result[] {
  return results.map(result => ({
    ...result, // Copia los valores originales
    shortTitle: result.title.slice(0, 20), // Agrega el nuevo campo `shortTitle`
  }));
}


export interface PublishedWork {
  isbn: string
  english_language_learner: boolean
  copyright: number
  page_count: number
  binding: string
  cover_art_url: string
}

export interface Measurements {
  english: English
}

export interface English {
  mlf: number
  msl: number
  lexile: number
}

