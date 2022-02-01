import { useRecoilValue, useSetRecoilState } from "recoil";
import { questionState, quizState } from "../../store/state";
import "./quizzes.css";

export function Quizzes() {
    const quiz = useRecoilValue(quizState);
    const setQuestion = useSetRecoilState(questionState)
    return(
      <div>
        <div className="box">
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
  