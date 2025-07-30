import React, { useState } from "react";
import { API } from "../config";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";
import '../css/Signup.css';


const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();

    signup({ name, email, password })
      .then(data => {
        if (data?.error || data.err) {
          setValues({ ...values, error: data.error || data.err, success: false });
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      });
  };





  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
      New account created. Please <Link to="/signin">Signin</Link>.
    </div>
  );


  return (
   <div className="container signup" >
      {showSuccess()}
            {error && (
  <div className="custom-error-message">
    <span className="error-icon">⚠️</span>
    <span className="error-text">{error}</span>
  </div>
)}
      <div className="signin-card">
        <h2 className="signin-title">Create Your Account</h2>
        <form className="signin-form">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
          />

          <button onClick={clickSubmit} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
