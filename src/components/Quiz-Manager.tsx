import { Login } from "./login/Login";
import { Quizzes } from "./quizzes/Quizzes-Admin";
import { editQuestionPageState, loggedInState, questionState, quizState } from "../store/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { Questions } from "./questions/Questions-Admin";
import { EditQuestion } from "./edit-question/EditQuestion";

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
    "id":{"N":number},
    "quizName": {"S":string},
    "quizQuestions": {"L": IQuizQuestion[]}
}

export interface IQuizResponse {
    "Count": number,
    "Items": IQuiz[],
    "ScannedCount":number
  }

export const getApiKeys = async (): Promise<IQuizResponse> => {
    const url = ("https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/list");
    const data = (await fetch(url)).json();
    return data;
};

export function QuizManager() {
    const loggedIn = useRecoilValue(loggedInState);
    const question = useRecoilValue(questionState);
    const answer = useRecoilValue(editQuestionPageState);
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
            {!loggedIn ? <Login/> : (!question.questions ? <Quizzes/> : (!answer ? <Questions/> : <EditQuestion/>))}
        </div>
    )
}
