import { IUser } from "../quiz-data";
import { compare } from "./encrypt";
/* interface for the response (TypeScript) */
interface IApiResponse { 
    Count: number,
    Items: {
        role?: {S: string},
        password?: {S: string},
        username?: {S: string}
    }[],
    ScannedCount: number
}

/* function that deals with the returned API value */
const queryValidation = (res: IApiResponse, password: string) => {
    if (res.Count === 1){
        if(compare(password, res.Items[0].password!.S)){
            document.cookie = `username=${res.Items[0].username?.S}`
            document.cookie = `role=${res.Items[0].role?.S}`
            window.location.pathname = "/";
        } else {
            alert('Incorrect Password')
        }
    } else {
        alert("Incorrect Username")
    }
}

const checkUser = async (user: IUser) => { // calls the API to check the username & password against the DB
    const url = `https://i83herpnfj.execute-api.eu-west-1.amazonaws.com/test/query-user?username=${user.username}`;
    const data = (await fetch(url)).json().then((res)=>{queryValidation(res, user.password)});
    console.log(data);
}

export default checkUser;