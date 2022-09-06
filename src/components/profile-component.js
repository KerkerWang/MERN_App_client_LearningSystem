import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileComponent = ({ currentUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      window.alert("Login to see your profile.");
      navigate("/login");
    }
  });
  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && (
        <div>
          <h1>In profile page.</h1>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>Token: {currentUser.token}</strong>
          </p>
          <p>
            <strong>ID: {currentUser.user._id}</strong>
          </p>
          <p>
            <strong>Email: {currentUser.user.email}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
