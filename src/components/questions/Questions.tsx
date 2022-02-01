import { mockQuizData } from "../quiz-data";
import "./questions.css";

export function Questions() {
    let quizData = mockQuizData[0];
    return(
      <div>
        <div className="box">
         <h1 className="title">Questions</h1>
         <div>
            {quizData.quizQuestions.map((answer)=>{
                return (
                    <div className="question-box">
                        <h3 className="question-title">{answer.question}</h3>
                        <ol type="A" className="questions">
                            <li>{answer.answers.A}</li>
                            <li>{answer.answers.B}</li>
                            <li>{answer.answers.C}</li>
                        </ol>
                    </div>
                )
                }
            )}
          </div>
        </div>
      </div>
    )
  }
  