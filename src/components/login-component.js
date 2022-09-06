import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  const { setCurrentUser } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const EmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const PasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = () => {
    AuthService.login(email, password)
      .then((respose) => {
        console.log(respose.data);
        if (respose.data.token) {
          localStorage.setItem("user", JSON.stringify(respose.data));
        }
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={EmailChangeHandler}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={PasswordChangeHandler}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={loginHandler} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
