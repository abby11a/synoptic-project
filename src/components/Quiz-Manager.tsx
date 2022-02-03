import { Quizzes } from "./quizzes/Quizzes";
import { QuizzesAdmin } from "./quizzes/Quizzes-Admin";
import { addQuestionPageState, editQuestionPageState, quizIndexState, quizState } from "../store/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { QuestionsAdmin } from "./questions/Questions-Admin";
import { QuestionsView } from "./questions/Questions-View";
import { AddQuestion } from "./edit-question/AddQuestion";
import { EditQuestion } from "./edit-question/EditQuestion";
import { Login } from "./login/Login";
import { Questions } from "./questions/Questions";

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
            {!quizIndex.questions ? <QuizQuizzes/> : (!editQuestionPage ? <QuizQuestions/> : (addQuestionPage ? <AddQuestion/>: <EditQuestion/>))}
        </div>
    )
}

// if user hasn't been logged in it will return to login page
function loginCheck () {
    console.log('used')
    if (!getCookie('role')){
        window.location.pathname = "/login";
    }
}

// returns the correct quiz view based on role
function QuizQuizzes () {
    if (getCookie('role')==="admin"){
        return(<QuizzesAdmin/>)
    } else if (getCookie('role')===("view")||getCookie('role')===("restricted")){
        return(<Quizzes/>)
    } else {
        return(<Login/>)
    }
}

// returns correct question page based on role
function QuizQuestions () {
    if (getCookie('role')==="admin"){
        return(<QuestionsAdmin/>)
    } else if (getCookie('role')===("view")){
        return(<QuestionsView/>)
    } else {
        return(<Questions/>)
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

export function deleteUserCookies() {
    if( getCookie( "role" ) ) {
      document.cookie = "role = ;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        window.location.reload()
    }
  }