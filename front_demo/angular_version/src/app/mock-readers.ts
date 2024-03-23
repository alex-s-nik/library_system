import { Reader } from "./interfaces/reader.inteface"

export const READERS: Reader[] =
[
    {
        name: "Твердислав Устинович Дементьев",
        card: "26899513788402652253",
        lendingFacts: [
            {
                id: 53362,
                bookId: 45554,
                takenDate: new Date(2021, 2, 3),
                returnedDate: new Date(2021, 2, 11)
            },
            {
                id: 73569,
                bookId: 25541,
                takenDate: new Date(2021, 7, 4),
                returnedDate: new Date(2021, 7, 8)
            },
            {
                id: 110979,
                bookId: 70031,
                takenDate: new Date(2022, 4, 10),
                returnedDate: new Date(2022, 4, 27)
            },
            {
                id: 123349,
                bookId: 10583,
                takenDate: new Date(2022, 7, 12),
                returnedDate: new Date(2022, 7, 14)
            }
        ],
        id: 0
    },
    {
        name: "Никодим Анатольевич Субботин",
        card: "78224772588544571965",
        lendingFacts: [
            {
                id: 20863,
                bookId: 74228,
                takenDate: new Date(2020, 6, 5),
                returnedDate: new Date(2020, 6, 7)
            },
            {
                id: 24075,
                bookId: 495,
                takenDate: new Date(2020, 6, 29),
                returnedDate: new Date(2020, 7, 1)
            },
            {
                id: 185463,
                bookId: 2283,
                takenDate: new Date(2023, 10, 20),
                returnedDate: new Date(2023, 10, 21)
            }
        ],
        id: 1
    },
    {
        name: "Милица Захаровна Назарова",
        card: "46316263704442769195",
        lendingFacts: [
            {
                id: 125532,
                bookId: 44815,
                takenDate: new Date(2022, 7, 28),
                returnedDate: new Date(2022, 7, 30)
            }
        ],
        id: 2
    },
    {
        name: "Буров Лукьян Гурьевич",
        card: "92474217100223438002",
        lendingFacts: [],
        id: 3
    }
]