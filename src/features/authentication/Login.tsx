import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  loginUserWithEmailAndPassword,
  loginUserWithGoogle,
} from "./authenticationSlice";
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
        <h1 className="welcome-text">Wellcome to WillloveTodo!</h1>
        <h3 className="welcome-description">the simple to do app!</h3>
      </div>
      <div className="email-login-container">
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
                dispatch(loginUserWithEmailAndPassword({ email, password }))
              }
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <img
        src="https://delpuerto.patterson.k12.ca.us/UserFiles/Servers/Server_18037253/Templates/login-google.png"
        alt=""
        className="login-button-google"
        onClick={() => dispatch(loginUserWithGoogle())}
      />
      <div className="register-text">
        new to the platforme please join us :
        <Link className="register-link" to="/register">
          {" "}
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
