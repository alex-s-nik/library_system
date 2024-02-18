export interface LendingFact {
    id: number;
    bookId: number;
    bookInfo: string;
    takenDate: Date;
    returnedDate: Date | null;
}