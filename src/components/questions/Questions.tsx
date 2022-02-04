import { useRecoilState, useRecoilValue } from "recoil";
import { quizIndexState, quizState } from "../../store/state";

import "./questions.css";

export function Questions() {
    const [quizIndex, setQuizIndex] = useRecoilState(quizIndexState);
    const quiz = useRecoilValue(quizState);

    return(
      <div>
        <div className="box">
        <button onClick={()=>setQuizIndex({questions: false, index: 0})}>Back to Quizzes</button>
        <h1 className="title">Questions</h1>
        <div>
            {quiz[quizIndex.index].quizQuestions.L.map((answer, index)=>{
                return (
                    <div key={index} className="question-box">
                        <h3 className="question-title">{answer.M.question.S}</h3>
                        <ol type="A" className="answers">
                            <li className="answer">{answer.M.answers.M.A.S}</li>
                            <li className="answer">{answer.M.answers.M.B.S}</li>
                            <li className="answer">{answer.M.answers.M.C.S}</li>
                            <li className="answer">{answer.M.answers.M.D?.S}</li>
                            <li className="answer">{answer.M.answers.M.E?.S}</li>
                        </ol>
                    </div>
                )
            })}
          </div>
        </div>
      </div>
    )
}