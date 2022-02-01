import { Login } from "./login/Login";
import { Quizzes } from "./quizzes/Quizzes";
import { loggedInState, questionState, quizState } from "../store/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { Questions } from "./questions/Questions";

export interface IQuiz {
    "id":{"N":number},
    "quizName": {"S":string},
    "quizQuestions": {
        "L": {
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
        }[]
    }
}

export interface IQuizResponse {
    "Count": number,
    "Items": IQuiz[],
    "ScannedCount":number
  }

const getApiKeys = async (): Promise<IQuizResponse> => {
    const url = ("https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/list");
    const data = (await fetch(url)).json();
    console.log(data)
    return data;
};

export function QuizManager() {
    const loggedIn = useRecoilValue(loggedInState);
    const question = useRecoilValue(questionState);
    const setQuiz = useSetRecoilState(quizState);

    const fetchData = async (): Promise<void> => {
        getApiKeys().then((res) => {
            return setQuiz(res.Items);
        })
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            {!loggedIn ? <Login/> : (!question.questions ? <Quizzes/> : <Questions/>)}
        </div>
    )
}

