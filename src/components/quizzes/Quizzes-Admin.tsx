import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, questionState, quizNameState, quizState } from "../../store/state";
import "./quizzes.css";

export function Quizzes() {
    const quiz = useRecoilValue(quizState);
    const setQuestion = useSetRecoilState(questionState);
    const setLoggedIn = useSetRecoilState(loggedInState);
    return(
      <div>
        <div id="add-form" className="add-form"><AddQuiz/></div>
        <div className="box" id="main-quizzes-page">
         <button onClick={()=>setLoggedIn(false)}>Log out</button>
         <button className="small-button" onClick={()=>openForm()}>Add Quiz</button>
         <h1 className="title">Quizzes </h1>
          {quiz.map((quiz, index)=>{
              return(
                  <div className="quiz-box">
                    <button className="delete-button" onClick={()=>deleteQuiz(quiz.id.N)}>X</button>
                    <div className="question" onClick={()=>setQuestion({questions: true, questionNumber: index})}>{quiz.quizName.S}</div>
                  </div>
              )
          })}
        </div>
      </div>
    )
}

async function deleteQuiz (id: number) {
    const url = `https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/delete-quiz?id=${id}`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res)=>console.log(res));
}

async function addQuiz (id: number, quizName: string) {
  const url = `https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/create-quiz`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({id: id, quizName: quizName}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res)=>console.log(res));
}

function AddQuiz () {
  const [quizName, setQuizName] = useRecoilState(quizNameState);
  return(
    <div>
      <div className="form-box">
      <button className="x-button" onClick={()=>closeForm()}>X</button>
        <h1 className="form-title">Add a New Quiz</h1>
        <input type="text" placeholder="Enter Quiz Title" className="input-box" onChange={(e)=>setQuizName(e.target.value)}/>
        <button className="button" onClick={()=>{addQuiz(3, quizName); closeForm()}}>Add</button>
      </div>
    </div>
  )
}
function openForm() {
  document.getElementById("add-form")!.style.display = "block";
}

function closeForm() {
  document.getElementById("add-form")!.style.display = "none";
}
