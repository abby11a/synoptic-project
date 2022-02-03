import { BrowserRouter, Route, Routes } from "react-router-dom";
import {QuizManager} from "./components/Quiz-Manager";

import { RecoilRoot } from "recoil";
import { Login } from "./components/login/Login";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<QuizManager/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>                
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;
