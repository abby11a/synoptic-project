import { BrowserRouter, Route, Routes } from "react-router-dom";
import {QuizManager} from "./components/Quiz-Manager";

import { RecoilRoot } from "recoil";
import { AddQuestion } from "./components/add-question/AddQuestion";
import { Questions } from "./components/questions/Questions-Admin";
import { Quizzes } from "./components/quizzes/Quizzes";
import { EditQuestion } from "./components/edit-question/EditQuestion";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<QuizManager/>}/>
          <Route path='/add-questions' element={<AddQuestion/>}/>
          <Route path='/add-questions-admin' element={<EditQuestion/>}/>
          <Route path='/questions' element={<Questions/>}/>
          <Route path='/quizzes' element={<Quizzes/>}/>
        </Routes>                
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;
