import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
//import { CircularProgress } from '@mui/material';


export default function Login() {
  const email = useRef();
  const password = useRef();
  const {isFetching,dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">KiniaRuna</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on KiniaRuna.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" 
             type="email" 
             required 
             className="loginInput" 
             ref={email} />
            <input placeholder="Password" 
              type="password" 
              required
              minLength="6"
              className="loginInput"
              ref={password}/>
            <button className="loginButton" type="Submit" disabled={isFetching}>
            {isFetching ? (
                 "loading"
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            {isFetching ? (
                "loading"
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
