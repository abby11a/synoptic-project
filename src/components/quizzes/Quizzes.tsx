import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, questionState, quizState } from "../../store/state";
import "./quizzes.css";

export function Quizzes() {
    const quiz = useRecoilValue(quizState);
    const setQuestion = useSetRecoilState(questionState);
    const setLoggedIn = useSetRecoilState(loggedInState);
    return(
      <div>
        <div className="box">
         <button onClick={()=>setLoggedIn(false)}>Log out</button>
         <h1 className="title">Quizzes</h1>
          {quiz.map((quiz, index)=>{
              return(
                  <div onClick={()=>setQuestion({questions: true, questionNumber: index})} className="quiz-box">{quiz.quizName.S}</div>
              )
          })}
        </div>
      </div>
    )
}