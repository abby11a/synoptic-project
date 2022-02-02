import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { editQuestionPageState, questionNumberState, questionState, quizState } from "../../store/state";
import { deleteQuestion } from "../edit-question/EditQuestion";


import "./questions.css";

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
                      <button className="x-button" onClick={()=>deleteQuestion(questions.questionNumber, index, quiz[questions.questionNumber])}>X</button>
                      <h3 className="question-title">{answer.M.question.S}</h3>
                      <ol type="A" className="answers">
                            <li className="answer">{answer.M.answers.M.A.S}</li>
                            <li className="answer">{answer.M.answers.M.B.S}</li>
                            <li className="answer">{answer.M.answers.M.C.S}</li>
                      </ol><br/>
                      <div className="correct-answer">Correct Answer: {answer.M.answers.M.correct.S}</div>
                  </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}