import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/state";
import { IUser } from "../quiz-data";
import checkUser from "./api-call";
import "./login.css";

export function Login() {
    const [user, setUser] = useRecoilState(loginUserState); // state stores the client's username and password

    return (
      <div>
        <div className="box">
            <h1 className="title">Login</h1>
            <div className='label'>Username
                <input data-testid="login-username" className="input-box" type={"text"} placeholder="Enter Username" name={"username"} onChange={(e)=>setUser({username: e.target.value, password: user.password})}></input>
            </div>
            <div className='label'>Password
                <input data-testid="login-password" className="input-box" type={"password"} placeholder="Enter Password" name={"password"} onChange={(e)=>setUser({username: user.username, password: e.target.value})}></input>
            </div>
            <button data-testid="login-button"  className="button" type="submit" onClick={()=>checkUser(user)}>Submit</button>
        </div>
      </div>
    )
}