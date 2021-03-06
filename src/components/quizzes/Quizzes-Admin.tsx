import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { quizIndexState, quizNameState, quizState } from "../../store/state";
import { IQuiz } from "../quiz-data";
import { deleteUserCookies } from "../Quiz-Manager";
import "./quizzes.css";

export function QuizzesAdmin() {
    const quiz = useRecoilValue(quizState);
    const setQuizIndex= useSetRecoilState(quizIndexState);
    return(
      <div>
        <div id="add-form" className="add-form"><AddQuiz/></div>
        <div className="box" id="main-quizzes-page">
         <button onClick={()=>deleteUserCookies()}>Log out</button>
         <button className="small-button" onClick={()=>openForm()}>Add Quiz</button>
         <h1 className="title" data-testid="Quizzes">Quizzes </h1>
          {quiz.map((quiz, index)=>{
              return(
                  <div className="quiz-box" key={index}>
                    <button className="delete-button" onClick={()=>{deleteQuiz(quiz.id.N)}}>X</button>
                    <div className="question" onClick={()=>setQuizIndex({questions: true, index: index})}>{quiz.quizName.S}</div>
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
    }).then(()=>window.location.reload());
}

async function addQuiz (id: number, quizName: string) {
  const url = `https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/create-quiz`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({id: id, quizName: quizName}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(()=>window.location.reload());
}

function AddQuiz () {
  const [quizName, setQuizName] = useRecoilState(quizNameState);
  const quiz = useRecoilValue(quizState);
  return(
    <div>
      <div className="form-box">
      <button className="x-add-question-button" onClick={()=>closeForm()}>X</button>
        <h1 className="form-title">Add a New Quiz</h1>
        <input type="text" placeholder="Enter Quiz Title" className="input-box" onChange={(e)=>setQuizName(e.target.value)}/>
        <button className="button" onClick={()=>{addQuiz(getNewQuizId(quiz), quizName); closeForm()}}>Add</button>
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

function getNewQuizId (quizzes: IQuiz[]) {
  let idArr: number[] = [-1];
  for (let i = 0; i < quizzes.length; i++){
    if (!(idArr.includes(quizzes[i].id.N))) {
      idArr.push(Number(quizzes[i].id.N))
    }
  }
  for (let j = 0; j < quizzes.length + 1; j++) {
    if (!(idArr.includes(j))) {
      return j;
    }
  } return 0;
}