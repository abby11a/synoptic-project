import { mockQuizData } from "../quiz-data";
import "./questions.css";

export function Questions() {
  let quizData = mockQuizData[0];
  return(
    <div>
      <div className="box">
        <button className="add-button" onClick={()=>addQuestion()}>Add</button>
        <h1 className="title">Questions</h1>
        
        <div>
          {quizData.quizQuestions.map((answer, index)=>{
              return (
                  <div className="question-box" onClick={()=>editQuestion(answer.question)}>
                      <h3 className="question-title">{answer.question}</h3>
                      <button className="delete-button" onClick={()=>deleteQuestion()}>X</button>
                      <ol type="A" className="questions">
                          <li key="A">{answer.answers.A}</li>
                          <li key="B">{answer.answers.B}</li>
                          <li key="C">{answer.answers.C}</li>
                      </ol>
                  </div>
              )
              }
          )}
        </div>
        <i>Click an entry to edit it.</i>
      </div>
    </div>
  )
}
  
function addQuestion () {
  console.log("Add Question")
}

function editQuestion (question: string) {
  console.log(question)
}

async function deleteQuestion () {
  console.log("Delete Question")
}