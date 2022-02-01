import { atom } from 'recoil';

export const loginUserState = atom({
  key: "loginUserState",
  default: {
    "username":'',
    "password": ''
  }
});

export const loggedInState = atom({
  key: "loggedInState",
  default: false
});