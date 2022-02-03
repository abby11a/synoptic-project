import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedInState, loginUserState } from "../../store/state";
import { IUser } from "../quiz-data";
import "./login.css";
import { compare } from './encrypt';

interface IApiResponse { // interface for the response (TypeScript)
    Count: number,
    Items: {
        role?: {S: string},
        password?: {S: string},
        username?: {S: string}
    }[],
    ScannedCount: number
}


export function Login() {
    const [user, setUser] = useRecoilState(loginUserState); // state stores the client's username and password
    const setLoggedIn = useSetRecoilState(loggedInState); // state that allows the user to access quiz manager after logging in

    const queryValidation = (res: IApiResponse, password: string) => { // function that deals with the returned API value
        if (res.Count === 1){
            if(compare(password, res.Items[0].password!.S)){
                document.cookie = `username=${res.Items[0].username?.S}`
                document.cookie = `role=${res.Items[0].role?.S}`
                setLoggedIn(true);
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

    return (
      <div>
        <div className="box">
            <h1 className="title">Login</h1>
            <div className='label'>Username
                <input className="input-box" type={"text"} placeholder="Enter Username" name={"username"} onChange={(e)=>setUser({username: e.target.value, password: user.password})}></input>
            </div>
            <div className='label'>Password
                <input className="input-box" type={"password"} placeholder="Enter Password" name={"password"} onChange={(e)=>setUser({username: user.username, password: e.target.value})}></input>
            </div>
            <button className="button" type="submit" onClick={()=>checkUser(user)}>Submit</button>
        </div>
      </div>
    )
}