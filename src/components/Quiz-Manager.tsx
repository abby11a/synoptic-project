import { Login } from "./login/Login";
import { Quizzes } from "./quizzes/Quizzes";
import { Questions } from "./questions/Questions-Admin";
import {AddQuestion} from "./add-question/AddQuestion";
import {EditQuestion} from "./edit-question/EditQuestion"
import { loggedInState } from "../store/state";
import { useRecoilValue } from "recoil";

export function QuizManager() {
    const loggedIn = useRecoilValue(loggedInState);
    return (
        <div>
            {!loggedIn ? <Login/> : <Quizzes/>}
        </div>
    )
}

