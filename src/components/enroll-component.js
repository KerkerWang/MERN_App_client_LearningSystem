import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const inputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const searchHandler = () => {
    CourseService.getCourseByName(searchInput)
      .then((response) => {
        console.log(response);
        setSearchResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const enrollHandler = (e) => {
    CourseService.enroll(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("Done Enrollment!");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      window.alert("You must login first before searching for courses.");
      navigate("/login");
    } else if (currentUser && currentUser === "instructor") {
      window.alert("Only students can enroll in courses.");
      navigate("/course");
    }
  });

  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && currentUser.user.role === "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={inputChangeHandler}
            type="text"
            className="form-control"
          />
          <button onClick={searchHandler} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <p>Data we got back from API.</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price: {course.price}</p>
                <p>Student: {course.students.length}</p>
                <a
                  href="#"
                  onClick={enrollHandler}
                  className="btn btn-primary"
                  id={course._id}
                >
                  Enroll
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
