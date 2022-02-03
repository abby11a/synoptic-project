import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, quizIndexState, quizState } from "../../store/state";
import "./quizzes.css";

export function Quizzes() {
    const quiz = useRecoilValue(quizState);
    const setQuizIndex = useSetRecoilState(quizIndexState);
    const setLoggedIn = useSetRecoilState(loggedInState);
    console.log()
    return(
      <div>
        <div className="box">
         <button onClick={()=>setLoggedIn(false)}>Log out</button>
         <h1 className="title">Quizzes</h1>
          {quiz.map((quiz, index)=>{
              return(
                  <div onClick={()=>setQuizIndex({questions: true, index: index})} className="quiz-box">{quiz.quizName.S}</div>
              )
          })}
        </div>
      </div>
    )
}