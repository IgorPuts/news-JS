export interface ISource {
    id: string | null;
    name: string;
}

export interface IArticle {
    source: ISource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface IArticlesResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface ISourceDetails {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISourcesResponse {
    status: string;
    sources: ISourceDetails[];
}

export type SourceCategory =
    | 'all'
    | 'business'
    | 'entertainment'
    | 'general'
    | 'health'
    | 'science'
    | 'sports'
    | 'technology'
    | 'pinned';

export type ISourceFilter = Pick<ISourceDetails, 'id' | 'name' | 'category'>;
