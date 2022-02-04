export interface IQuizQuestion {
    "M": {
        "question":{"S":string},
        "answers": {
            "M": {
            "A": {"S": string},
            "B": {"S": string},
            "C": {"S": string},
            "D"?: {"S": string},
            "E"?: {"S": string},
            "correct": {"S": string}
            }
        }
    }
}

export interface IQuiz {
    "id": {"N":number},
    "quizName": {"S":string},
    "quizQuestions": {"L": IQuizQuestion[]}
}

export interface IQuizResponse {
    "Count": number,
    "Items": IQuiz[],
    "ScannedCount":number
}

export interface IUser {
    username: string,
    password: string
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
    
