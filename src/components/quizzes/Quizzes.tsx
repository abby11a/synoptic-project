import { useRecoilValue } from "recoil";
import { quizState } from "../../store/state";
import "./quizzes.css";

export function Quizzes() {
    const quiz = useRecoilValue(quizState);
    return(
      <div>
        <div className="box">
         <h1 className="title">Quizzes</h1>
          {quiz.map((quiz)=>{
              return(
                  <div className="quiz-box">{quiz.quizName.S}</div>
              )
          })}
        </div>
      </div>
    )
}
  