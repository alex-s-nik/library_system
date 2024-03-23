export interface LendingFact {
    id: number;
    bookId: number;
    takenDate: Date;
    returnedDate: Date | null;
}