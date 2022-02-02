import { atom } from 'recoil';
import { IQuiz } from "../components/Quiz-Manager"
export const loginUserState = atom({
  key: "loginUserState",
  default: {
    "username":'',
    "password": ''
  }
});

// restricted, view, admin
export const userRoleState = atom({
  key: "userRoleState",
  default: "restricted"
});

export const loggedInState = atom({
  key: "loggedInState",
  default: false
});

export const quizState = atom({
  key: "quizState",
  default: {} as IQuiz[]
});

export const questionState = atom({
  key: "questionState",
  default: {
    questions: false,
    questionNumber: 0
  }
})

export const selectedItemState = atom({
  key: "selectedItemState",
  default: ""
});

export const quizNameState = atom({
  key: "quizNameState",
  default: ""
});