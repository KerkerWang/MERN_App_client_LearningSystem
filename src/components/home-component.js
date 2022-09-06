import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const registerHandler = () => {
    navigate("/register");
  };
  const loginHandler = () => {
    navigate("/login");
  };
  return (
    <div>
      <main>
        <div className="container py-4">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Learning System</h1>
              <p className="col-md-8 fs-4">
                This system is using React.js as front-end framework, and
                Node.js, MongoDB as backend server. This kind of project is
                called MERN project, which is one of the most popular way to
                create modern websites.
              </p>
            </div>
          </div>

          <div className="row align-items-md-stretch">
            <div className="col-md-6">
              <div className="h-100 p-5 text-white bg-dark rounded-3">
                <h2>As a student</h2>
                <p>
                  Students can register in courses they like. This website is
                  for practice purpose only, so please do not provide any
                  personal information, such as credit card numbers.
                </p>
                <button
                  style={{ marginBottom: "1rem" }}
                  onClick={registerHandler}
                  className="btn btn-outline-light"
                  type="button"
                >
                  Register Now
                </button>
                <br />
                <button
                  onClick={loginHandler}
                  className="btn btn-outline-light"
                  type="button"
                >
                  Login Now
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 p-5 bg-light border rounded-3">
                <h2>As an Instructor</h2>
                <p>
                  You can become an instructor by registering as one, and start
                  making online courses. This website is for practice purpose
                  only, so please do not provide any personal information, such
                  as credit card numbers.
                </p>
                <button
                  style={{ marginBottom: "1rem" }}
                  onClick={registerHandler}
                  className="btn btn-outline-secondary"
                  type="button"
                >
                  Register Now
                </button>
                <br />
                <button
                  onClick={loginHandler}
                  className="btn btn-outline-secondary"
                  type="button"
                >
                  Login Now
                </button>
              </div>
            </div>
          </div>

          <footer className="pt-3 mt-4 text-muted border-top">
            &copy; 2022 Kerker Wang
          </footer>
        </div>
      </main>
    </div>
  );
};

export default HomeComponent;
