import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { editQuestionPageState, questionNumberState, questionState, quizState } from "../../store/state";

import "./questions.css";

function deleteItem(itemName: string) {
    console.log(itemName)
}

export function Questions() {
  const [questions, setQuestions] = useRecoilState(questionState);
  const quiz = useRecoilValue(quizState);
  const setQuestionNumberState = useSetRecoilState(questionNumberState);
  const setEditQuestionPageState = useSetRecoilState(editQuestionPageState);

  return(
    <div>
      <div className="box">
      <button onClick={()=>setQuestions({questions: false, questionNumber: 0})}>Back to Quizzes</button>
      <h1 className="title">Questions</h1>
      <div>
          {quiz[questions.questionNumber].quizQuestions.L.map((answer, index)=>{
              return (
                  <div className="question-box" onClick={()=>{setQuestionNumberState(index); setEditQuestionPageState(true)}}>
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