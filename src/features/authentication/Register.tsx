import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { registerUserWithEmailAndPassword } from "./authenticationSlice";
import "./Login.css";
import logo from "../../logo.png";

function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div>
        <img className="logo" src={logo} alt="" />
        <h1 className="welcome-text">Join us in WillloveTodo!</h1>
      </div>
      <div className="email-login-container">
        <h3>
          {" "}
          create a new account so that you find you todos cross devices !
        </h3>
        <div className="form-container">
          <div className="input-container">
            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div>
            <button
              className="login-button"
              onClick={() =>
                dispatch(registerUserWithEmailAndPassword({ email, password }))
              }
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <div className="register-text">
        already have an account :
        <Link className="register-link" to="/">
          {" "}
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Login;
