import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { Navigate, useParams } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import "../css/Profile.css";
const Profile = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false
    });

    const { userId } = useParams();
    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = (userId) => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(userId, token, { name, email, password }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = () => {
        if (success) {
            return <Navigate to="/user/dashboard" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form onSubmit={clickSubmit} className="profile-form">
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    value={name}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    value={email}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
        </form>
    );

    return (
       
            <div className="profile-container">
                <h2>Profile Update</h2>
                {profileUpdate(name, email, password)}
                {redirectUser()}
            </div>
       
    );
};

export default Profile;
