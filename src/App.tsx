import { BrowserRouter, Route, Routes } from "react-router-dom";
import {QuizManager} from "./components/Quiz-Manager";

import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<QuizManager/>}/>
        </Routes>                
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;
