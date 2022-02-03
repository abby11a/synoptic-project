import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { answerState, editQuestionPageState, questionNumberState, quizIndexState, quizState } from "../../store/state";
import { IQuiz, IQuizQuestion } from "../Quiz-Manager";
import "./edit-questions.css";

export function EditQuestion() {
  const setEditQuestionPageState = useSetRecoilState(editQuestionPageState);
  return(
    <div>
      <div className="box">
        <button onClick={()=>setEditQuestionPageState(false)}>Back to Questions</button>
        <h1 className="title">Edit Question</h1>
        <AddAnswers/>
      </div>
    </div>
  )
}

export function AddAnswers() {
  const [answer, setAnswer] = useRecoilState(answerState);
  const quizIndex = useRecoilValue(quizIndexState);
  const quiz = useRecoilValue(quizState);
  const questionNumber = useRecoilValue(questionNumberState);

  let currentQuestion = quiz[quizIndex.index].quizQuestions.L[questionNumber].M

  const changeAnswer = (event: React.ChangeEvent<HTMLInputElement>, letter: 'a'|'b'|'c'|'d'|'e'|'correct'|'question') => {
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

  function initialSet () {
    setAnswer({question: currentQuestion.question.S, a: currentQuestion.answers.M.A.S, b: currentQuestion.answers.M.B.S, c:currentQuestion.answers.M.C.S, d:currentQuestion.answers.M.D?.S as string, e:currentQuestion.answers.M.E?.S as string, correct:currentQuestion.answers.M.correct.S})
  }

  useEffect(() => {
    initialSet()
  }, []);
  return(
    
    <div>
        <div>
          <input className="input-box" value={answer.question} placeholder="Enter New Question" name={"questions"} onChange={(e)=>changeAnswer(e, 'question')}></input>
          <input className="input-box" value={answer.a} placeholder="Enter Answer A" name={"answerA"} onChange={(e)=>changeAnswer(e, 'a')}></input>
          <input className="input-box" value={answer.b} placeholder="Enter Answer B" name={"answerB"} onChange={(e)=>changeAnswer(e, 'b')}></input>
          <input className="input-box" value={answer.c} placeholder="Enter Answer C" name={"answerC"} onChange={(e)=>changeAnswer(e, 'c')}></input>
          <input className="input-box" value={answer.d} placeholder="Enter Answer D (optional)" name={"answerD"} onChange={(e)=>changeAnswer(e, 'd')}></input>
          <input className="input-box" value={answer.e} placeholder="Enter Answer E (optional)" name={"answerE"} onChange={(e)=>changeAnswer(e, 'e')}></input>
        </div>
    
      <div className="correct-title">Correct Answer: </div>
      <input value={answer.correct}  onChange={(e)=>changeAnswer(e, 'correct')}/>
      <datalist id="correct-answers"> 
        <option value="A"></option>
        <option value="B"></option>
        <option value="C"></option>
      </datalist>
      <button className="button" type="submit" onClick={()=>editQuestion(questionNumber, answer, quiz[quizIndex.index])}>Add Question</button>
    </div>
  )
}

// converts field data to a quiz question format
function newQuizQuestion (answer: IAnswer): IQuizQuestion {
  return ({
    "M": {
      "question":{"S":answer.question},
      "answers": {
          "M": {
          "A": {"S": answer.a},
          "B": {"S": answer.b},
          "C": {"S": answer.c},
          "D": {"S": "answer.d!"},
          "E": {"S": answer.e!},
          "correct": {"S": answer.correct}
          }
      }
    }
  })
}

// creates a new IQuiz with the updated quiz question
function processData(quiz: IQuiz, questionIndex: number, newQuizQuestion: IQuizQuestion): IQuizQuestion[]{
  let newQuizQuestions = quiz.quizQuestions.L.slice();
  newQuizQuestions[questionIndex] = newQuizQuestion;
  return newQuizQuestions;
}

// calls API to actually update data
export async function editQuestion (questionIndex: number, answer: IAnswer, quiz: IQuiz) {
  let quizQuestion = newQuizQuestion(answer);
  let newQuizData = processData(quiz, questionIndex, quizQuestion);
  let quizName = quiz.quizName.S;
  let id = quiz.id.N;

  const url = ` https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/create`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({id: id, quizName: quizName, quizQuestions: newQuizData}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(()=>window.location.reload());
}

function processDeleteData(quiz: IQuiz, questionIndex: number): IQuizQuestion[]{
  let newQuizQuestions = quiz.quizQuestions.L.slice();
  delete newQuizQuestions[questionIndex]
  return newQuizQuestions;
}

export async function deleteQuestion (quizId: number, questionIndex: number, quiz: IQuiz) {
  let newQuizData = processDeleteData(quiz, questionIndex);
  let quizName = quiz.quizName.S;
  
  const url = ` https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/create`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({id: quizId, quizName: quizName, quizQuestions: newQuizData}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(()=>window.location.reload());
}

interface IAnswer {
  question: string;
  a: string;
  b: string;
  c: string;
  d?: string;
  e?: string;
  correct: string;
}