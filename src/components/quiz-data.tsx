export interface IUser {
    username: string,
    password: string
}

interface IQuizAnswer {
    A: string,
    B: string,
    C: string,
    D?: string,
    E?: string,
    correct: "A"|"B"|"C"|"D"|"E"
}

export interface IQuizQuestion {
    question: string,
    answers: IQuizAnswer
}

export interface IQuiz {
    quizName: string,
    quizQuestions: IQuizQuestion[]
}

export const mockQuizData: IQuiz[] = [
    {
        quizName: "Places around the world",
        quizQuestions: [
            {
                question: "What is the capital of Mexico?",
                answers: {
                    A: "Buenos Aires",
                    B: "Santiago",
                    C: "Mexico City",
                    D: "Quito",
                    correct: "C"
                }
            },
            {
                question: "What continent is Argentina in?",
                answers: {
                    A: "Europe",
                    B: "South America",
                    C: "Asia",
                    D: "Africa",
                    correct: "B"
                }
            }
        ]
    },
    {
        quizName: "Places around the world",
        quizQuestions: [
            {
                question: "What is the capital of Mexico?",
                answers: {
                    A: "Buenos Aires",
                    B: "Santiago",
                    C: "Mexico City",
                    D: "Quito",
                    correct: "C"
                }
            }
        ]
    },
]