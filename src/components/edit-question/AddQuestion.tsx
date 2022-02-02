import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { answerState, questionNumberState, questionState, quizState } from "../../store/state";
import { IQuiz, IQuizQuestion } from "../Quiz-Manager";
import "./edit-questions.css";

export function EditQuestion() {
  return(
    <div>
      <div className="box">
        <h1 className="title">Edit Question</h1>
        <AddAnswers/>
      </div>
    </div>
  )
}

export function AddAnswers() {
  const [answer, setAnswer] = useRecoilState(answerState);
  const questions = useRecoilValue(questionState);
  const quiz = useRecoilValue(quizState);
  const questionNumber = useRecoilValue(questionNumberState);

  let currentQuestion = quiz[questions.questionNumber].quizQuestions.L[questionNumber].M

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
      <input value={answer.correct} list="correct-answers" onChange={(e)=>changeAnswer(e, 'correct')}/>
      <datalist id="correct-answers"> 
        <option value="a"></option>
        <option value="b"></option>
        <option value="c"></option>
      </datalist>
      <button className="button" type="submit" onClick={()=>editQuestion(questions.questionNumber, processData(quiz[questions.questionNumber], questionNumber, newQuizQuestion(answer)))}>Add Question</button>
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
          "D": {"S": answer.d},
          "E": {"S": answer.e},
          "correct": {"S": answer.correct}
          }
      }
    }
  })
}

// creates a new IQuiz with the updated quiz question
function processData(quiz: IQuiz, quizNumber: number, newQuizQuestion: IQuizQuestion): IQuizQuestion[]{
  let newQuizQuestions = quiz.quizQuestions.L.slice();
  newQuizQuestions[quizNumber] = newQuizQuestion;
  return newQuizQuestions;
}

// calls API to actually update data
async function editQuestion (id: number, quizQuestions: IQuizQuestion[]) {
  const url = `https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/edit-question`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({id: id, quizQuestions: quizQuestions}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res)=>console.log(res));
}

interface IAnswer {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  correct: string;
}