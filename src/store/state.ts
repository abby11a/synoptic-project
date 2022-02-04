import { atom, RecoilValue } from 'recoil';
import { mockQuizData } from '../components/quiz-data';

export const loginUserState = atom({
  key: "loginUserState",
  default: {
    "username":'',
    "password": ''
  }
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