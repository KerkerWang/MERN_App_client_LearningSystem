import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

// 此處都用<div>而不是用<form>是因為，
// 這裡要的只是框架，要用<button>把資料送去後端，
// 若用form則內部的button會把資料交去action處
const RegisterComponent = (props) => {
  const { setCurrentUser } = props;
  const navigate = useNavigate("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const roleChangeHandler = (e) => {
    setRole(e.target.value);
  };
  const registerHandler = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration succeeds. Now you're redirected to login page."
        );
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/login");
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
    // 以上register的參數已被放在state裡
  };

  // 如果message不是falsy則顯示message
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={usernameChangeHandler}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={emailChangeHandler}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={passwordChangeHandler}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">role</label>
          <input
            onChange={roleChangeHandler}
            type="text"
            className="form-control"
            name="role"
          />
        </div>
        <br />
        <button onClick={registerHandler} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
