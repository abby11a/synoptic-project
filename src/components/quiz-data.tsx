import { IQuizQuestion } from "./Quiz-Manager";

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


export interface IQuiz {
    quizName: string,
    quizQuestions: IQuizQuestion[]
}

export const mockQuizData: IQuizQuestion[] = 
    [
        {"M": {
            "question": {"S": "What is the capital of Mexico?"},
            "answers": {
                "M": {
                    "A": {"S": "Buenos Aires"},
                    "B": {"S": "Santiago"},
                    "C": {"S": "Mexico City"},
                    "D": {"S": "Quito"},
                    "correct": {"S": "C"}
                }  
            },
        }},
        {"M": {
            "question": {"S": "What is the capital of England?"},
            "answers": {
                "M": {
                    "A": {"S": "London"},
                    "B": {"S": "Paris"},
                    "C": {"S": "Venice"},
                    "correct": {"S": "A"}
                }
            },
        }},
    ]
    
