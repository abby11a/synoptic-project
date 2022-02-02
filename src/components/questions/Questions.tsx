import { useRecoilState, useRecoilValue } from "recoil";
import { questionState, quizState } from "../../store/state";

import "./questions.css";

function deleteItem(itemName: string) {
    console.log(itemName)
}

export function Questions() {
    const [questions, setQuestions] = useRecoilState(questionState);
    const quiz = useRecoilValue(quizState);

    return(
      <div>
        <div className="box">
        <button onClick={()=>setQuestions({questions: false, questionNumber: 0})}>Back to Quizzes</button>
        <h1 className="title">Questions</h1>
        <div>
            {quiz[questions.questionNumber].quizQuestions.L.map((answer)=>{
                return (
                    <div className="question-box">
                        <button onClick={()=>deleteItem(answer.M.question.S)}>X</button>
                        <h3 className="question-title">{answer.M.question.S}</h3>
                        <ol type="A" className="questions">
                            <li>{answer.M.answers.M.A.S}</li>
                            <li>{answer.M.answers.M.B.S}</li>
                            <li>{answer.M.answers.M.C.S}</li>
                        </ol>
                    </div>
                )
            })}
          </div>
        </div>
      </div>
    )
  }