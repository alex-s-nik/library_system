export interface SearchReaderResult {
    readerId: number;
    textBeforeHighlight: string;
    highlightedText: string;
    textAfterHighlight: string;
}

export interface SearchBookResult {
    bookId: number;
    bookInfo: string;
}