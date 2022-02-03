import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, quizIndexState, quizState } from "../../store/state";
import { deleteUserCookies } from "../Quiz-Manager";
import "./quizzes.css";

export function Quizzes() {
    const quiz = useRecoilValue(quizState);
    const setQuizIndex = useSetRecoilState(quizIndexState);
    const setLoggedIn = useSetRecoilState(loggedInState);
    console.log()
    return(
      <div>
        <div className="box">
        <button onClick={()=>deleteUserCookies()}>Log out</button>
         <h1 className="title">Quizzes</h1>
          {quiz.map((quiz, index)=>{
              return(
                  <div data-testid={`quiz-item-${index}`} onClick={()=>setQuizIndex({questions: true, index: index})} className="quiz-box">{quiz.quizName.S}</div>
              )
          })}
        </div>
      </div>
    )
}