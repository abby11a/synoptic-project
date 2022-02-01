import { mockQuizData } from "../quiz-data";
import "./quizzes.css";

export function Quizzes() {
    let quizData = mockQuizData;
    return(
      <div>
        <div className="box">
         <h1 className="title">Quizzes</h1>
          {quizData.map((quiz)=>{
              return(
                  <div className="quiz-box">{quiz.quizName}</div>
              )
          })}
        </div>
      </div>
    )
  }
  