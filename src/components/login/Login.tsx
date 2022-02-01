import { useRecoilState } from "recoil";
import { loginUserState} from "../../store/state";
import "./login.css";

export function Login() {
    return(
      <div>
        <div className="box">
         <h1 className="title">Login</h1>
          <LoginFields/>
          <button className="button" type="submit" onClick={()=>{}}>Submit</button>
        </div>
      </div>
    )
  }
  
export function LoginFields() {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    return(
      <div>
        <div className='label'>Username
            <input className="input-box" type={"text"} placeholder="Enter Username" name={"username"} onChange={(e)=>setLoginUser({username: e.target.value, password: loginUser.password})}></input>
        </div>
        <div className='label'>Password
            <input className="input-box" type={"password"} placeholder="Enter Password" name={"password"} onChange={(e)=>setLoginUser({username: loginUser.username, password: e.target.value})}></input>
        </div>
      </div>
    )
}