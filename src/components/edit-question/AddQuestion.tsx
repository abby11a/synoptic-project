import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { answerState, editQuestionPageState, quizIndexState, quizState } from "../../store/state";
import "./edit-questions.css";
import { editQuestion } from "./EditQuestion";

export function AddQuestion() {
  const setEditQuestionPageState = useSetRecoilState(editQuestionPageState);
  return(
    <div>
      <div className="box">
        <button onClick={()=>setEditQuestionPageState(false)}>Back to Questions</button>
        <h1 className="title">Add Question</h1>
        <AddAnswers/>
      </div>
    </div>
  )
}

export function AddAnswers() {
  const [answer, setAnswer] = useRecoilState(answerState);
  const quizIndex = useRecoilValue(quizIndexState);
  const quiz = useRecoilValue(quizState);

  const changeAnswer = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, letter: 'a'|'b'|'c'|'d'|'e'|'correct'|'question') => {
    if (letter === 'a') {
      setAnswer({a: event.target.value, b: answer.b, c: answer.c, d: answer.d, e:answer.e, correct: answer.correct, question: answer.question})
    } else if (letter === 'b') {
      setAnswer({a: answer.a, b: event.target.value, c: answer.c, d: answer.d, e:answer.e, correct: answer.correct, question: answer.question})
    } else if (letter === 'c') {
      setAnswer({a: answer.a, b: answer.b, c: event.target.value, d: answer.d, e:answer.e, correct: answer.correct, question: answer.question})
    } else if (letter === 'd') {
      setAnswer({a: answer.a, b: answer.b, c: answer.c, d: event.target.value, e:answer.e, correct: answer.correct, question: answer.question})
    } else if (letter === 'e') {
      setAnswer({a: answer.a, b: answer.b, c: answer.c, d: answer.d, e: event.target.value, correct: answer.correct, question: answer.question})
    } else if (letter === 'correct') {
      setAnswer({a: answer.a, b: answer.b, c: answer.c, d: answer.d, e:answer.e, correct: event.target.value, question: answer.question})
    } else if (letter === 'question') {
      setAnswer({a: answer.a, b: answer.b, c: answer.c, d: answer.d, e:answer.e, correct: answer.correct , question: event.target.value})
    }
  }

  return(
    <div>
        <div>
          <input className="input-box" placeholder="Enter New Question" name={"questions"} onChange={(e)=>changeAnswer(e, 'question')}></input>
          <input className="input-box" placeholder="Enter Answer A" name={"answerA"} onChange={(e)=>changeAnswer(e, 'a')}></input>
          <input className="input-box" placeholder="Enter Answer B" name={"answerB"} onChange={(e)=>changeAnswer(e, 'b')}></input>
          <input className="input-box" placeholder="Enter Answer C" name={"answerC"} onChange={(e)=>changeAnswer(e, 'c')}></input>
          <input className="input-box" placeholder="Enter Answer D (optional)" name={"answerD"} onChange={(e)=>changeAnswer(e, 'd')}></input>
          <input className="input-box" placeholder="Enter Answer E (optional)" name={"answerE"} onChange={(e)=>changeAnswer(e, 'e')}></input>
        </div>
    
      <div className="correct-title">Correct Answer: </div>
      <select id="correct-answers" value={answer.correct} onChange={(e)=>changeAnswer(e, 'correct')}> 
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
      </select>
      <button data-testid="add-question-button"  className="button" type="submit" onClick={()=>editQuestion(quiz[quizIndex.index].quizQuestions.L.length, answer, quiz[quizIndex.index])}>Add Question</button>
    </div>
  )
}