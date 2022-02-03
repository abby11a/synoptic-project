import { atom, RecoilValue } from 'recoil';
import { mockQuizData } from '../components/quiz-data';
import { IQuizQuestion } from "../components/Quiz-Manager"
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
  default: [{
    "id":{"N":0},
    "quizName": {"S":""},
    "quizQuestions": {"L": mockQuizData}
}]
});

// the index of the quiz that is selected
export const quizIndexState = atom({
  key: "quizIndexState",
  default: {
    questions: false,
    index: 0
  }
})

export const selectedItemState = atom({
  key: "selectedItemState",
  default: ""
});

//quizzes-admin
export const quizNameState = atom({
  key: "quizNameState",
  default: ""
});

// edit-question
export const answerState = atom({
  key: "answerstate",
  default: {question:'', a: '', b: '', c: '', d:'', e:'', correct: ''},
});

export const questionNumberState = atom({
  key: "questionNumberState",
  default: 0,
});

export const editQuestionPageState = atom({
  key: "editQuestionPageState",
  default: false
})

export const addQuestionPageState = atom({
  key: "addQuestionPageState",
  default: false
})

export interface IAtomOrSelector {
  node: RecoilValue<unknown>,
  onChange: Function
}