import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";
import CourseService from "../services/course.service";

const PostCourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) {
      window.alert("You must login first before posting a new course.");
      navigate("/login");
    } else if (currentUser.user.role !== "instructor") {
      window.alert("Only instrcutors can post new courses.");
      navigate("/course");
    }
  });

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const postCourse = () => {
    courseService
      .post(title, description, price)
      .then(() => {
        window.alert("New course has been created.");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && currentUser.user.role === "instructor" && (
        <div className="form-group">
          <label htmlFor="exampleforTitle">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={titleChangeHandler}
          />
          <br />
          <label htmlFor="exampleforContent">Content</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={descriptionChangeHandler}
          />
          <br />
          <label htmlFor="exampleforPrice">Price</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={priceChangeHandler}
          />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            Submit
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
