import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addQuestionPageState, answerState, editQuestionPageState, questionNumberState, quizIndexState, quizState } from "../../store/state";
import { deleteQuestion } from "../edit-question/EditQuestion";


import "./questions.css";

export function QuestionsAdmin() {
  const [quizIndex, setQuizIndex] = useRecoilState(quizIndexState);
  const setAnswer = useSetRecoilState(answerState);
  const setAddQuestionPage = useSetRecoilState(addQuestionPageState);
  const quiz = useRecoilValue(quizState);
  const setQuestionNumberState = useSetRecoilState(questionNumberState);
  const setEditQuestionPageState = useSetRecoilState(editQuestionPageState);
  
  return(
    <div>
      <div className="box">
        <button onClick={()=>setQuizIndex({questions: false, index: 0})}>Back to Quizzes</button>
        <button className="small-button" onClick={()=>{setAnswer(resetAnswers); setEditQuestionPageState(true); setAddQuestionPage(true)}}>Add Question</button>
        <h1 className="title">Questions</h1>
        <div>
          {quiz[quizIndex.index].quizQuestions.L.map((answer, index)=>{
              return (
                  <div className="question-box-admin" data-testid={`question-item-box-${index}`} onClick={()=>{setQuestionNumberState(index); setEditQuestionPageState(true); setAddQuestionPage(false)}}>
                      <button className="x-button" onClick={()=>deleteQuestion(quiz[quizIndex.index].id.N, index, quiz[quizIndex.index])}>X</button>
                      <h3 className="question-title">{answer.M.question.S}</h3>
                      <ol type="A" className="answers">
                            <li className="answer">{answer.M.answers.M.A.S}</li>
                            <li className="answer">{answer.M.answers.M.B.S}</li>
                            <li className="answer">{answer.M.answers.M.C.S}</li>
                            <li className="answer">{answer.M.answers.M.D?.S}</li>
                            <li className="answer">{answer.M.answers.M.E?.S}</li>
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

const resetAnswers = {question:'null', a: '', b: '', c: '', d:'', e:'', correct: ''}