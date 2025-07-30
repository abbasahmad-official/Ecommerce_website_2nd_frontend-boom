import React, { useState } from "react";
import { API } from "../config";
import { Navigate } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/index";

const Signin = () => {
    const [values, setValues] = useState({
        email: "gamer@gmail.com",
        password: "123456",
        error: "",
        loading: false,
        redirectToReferer: false


    });

    const { email, password, error, loading, redirectToReferer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();

        signin({ email, password })
            .then(data => {
                if (data?.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferer: true
                        });
                    })
                }
            });
    };


    const showLoading = () =>
        loading && (<div className="alert alert-info">
            <h2>loading...</h2>
        </div>);

    const redirectUser = () => {
        if (redirectToReferer) {
            if (user && user.role === 1) {
                return <Navigate to="/admin/dashboard" replace />
            } else {
                return <Navigate to="/user/dashboard" replace />
            }
        }
    }

  

 return (
    <div className="signin-container signup-container">
      {showLoading()}
      {error && (
  <div className="custom-error-message">
    <span className="error-icon">⚠️</span>
    <span className="error-text">{error}</span>
  </div>
)}

      <div className="signin-card">
        <h2 className="signin-title">Sign in to Your Account</h2>
        <form className="signin-form">
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
            Sign in
          </button>
        </form>
      </div>

      {redirectUser()}
    </div>
  );

};

export default Signin;
