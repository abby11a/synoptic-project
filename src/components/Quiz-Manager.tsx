import { Login } from "./login/Login";
import { Quizzes } from "./quizzes/Quizzes";
import { QuizzesAdmin } from "./quizzes/Quizzes-Admin";
import { addQuestionPageState, editQuestionPageState, loggedInState, quizIndexState, quizState } from "../store/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { Questions } from "./questions/Questions-Admin";
import { AddQuestion } from "./edit-question/AddQuestion";
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
    const quizIndex = useRecoilValue(quizIndexState);
    const editQuestionPage = useRecoilValue(editQuestionPageState);
    const addQuestionPage = useRecoilValue(addQuestionPageState);
    const setQuiz = useSetRecoilState(quizState);

    const fetchData = async (): Promise<void> => {
        console.log('fetched')
        getApiKeys().then((res) => {
            return setQuiz(res.Items);
        })
    }

    useEffect(() => {
        loginCheck()
        fetchData()
        console.log(getCookie('username'))
    }, []);
    
    return (
        <div>
            {!quizIndex.questions ? <QuizQuestion/> : (!editQuestionPage ? <Questions/> : (addQuestionPage ? <AddQuestion/>: <EditQuestion/>))}
        </div>
    )
}
function loginCheck () {
    console.log('used')
    if (!getCookie('role')){
        window.location.pathname = "/login";
    }
}
function QuizQuestion () {
    if (getCookie('role')==="admin"){
        return(<QuizzesAdmin/>)
    } else {
        console.log(getCookie('role'))
        return(<Quizzes/>)
    }
}
function getCookie(cName: string) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}