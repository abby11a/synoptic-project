import React from "react";
import "./edit-questions.css";

export function EditQuestion() {
  return(
    <div>
      <div className="box">
        <h1 className="title">Edit Questions</h1>
        <input className="input-box" placeholder="Enter New Question" name={"questions"} onChange={(e)=>{}}></input>
        <AddAnswers/>
        <button className="button" type="submit" onClick={()=>{}}>Add Question</button>
      </div>
    </div>
  )
}

export function AddAnswers() {
  return(
    <div>
        <div>
            <input className="input-box" placeholder="Enter Answer A" name={"answerA"} onChange={(e)=>changeAnswer(e, 'a')}></input>
            <input className="input-box" placeholder="Enter Answer B" name={"answerB"} onChange={(e)=>changeAnswer(e, 'b')}></input>
            <input className="input-box" placeholder="Enter Answer C" name={"answerC"} onChange={(e)=>changeAnswer(e, 'c')}></input>
            <input className="input-box" placeholder="Enter Answer D (optional)" name={"answerD"} onChange={(e)=>changeAnswer(e, 'd')}></input>
            <input className="input-box" placeholder="Enter Answer E (optional)" name={"answerE"} onChange={(e)=>changeAnswer(e, 'e')}></input>
        </div>
    
      <div className="correct-title">Correct Answer: </div>
      <input list="correct-answers" onChange={(e)=>changeAnswer(e, 'correct')}/>
      <datalist id="correct-answers"> 
        <option value="a"></option>
        <option value="b"></option>
        <option value="c"></option>
      </datalist>
    </div>
  )
}

const changeAnswer = (event: React.ChangeEvent<HTMLInputElement>, letter: 'a'|'b'|'c'|'d'|'e'|'correct') => {
    console.log(event.target.value)
}

