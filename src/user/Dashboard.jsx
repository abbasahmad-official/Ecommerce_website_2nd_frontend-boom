import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getpurchaseHistory } from "./apiUser";
import moment from "moment";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    token,
    user: { _id, name, email, role },
  } = isAuthenticated();

  useEffect(() => {
    getpurchaseHistory(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  }, [_id, token]);

  return (
    <div className="dashboard-container">
      {/* Left Side - User Links */}
      <div className="dashboard-left">
        <div className="dashboard-card user-links">
          <h3>User Links</h3>
          <ul>
            <li>
              <Link to="/cart">🛒 My Cart</Link>
            </li>
            <li>
              <Link to={`/profile/${_id}`}>👤 Update Profile</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side - Info + History */}
      <div className="dashboard-right">
        <div className="dashboard-card user-info">
          <h3>User Information</h3>
          <ul>
            <li><strong>Name:</strong> {name}</li>
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Role:</strong> {role === 1 ? "Admin" : "Registered User"}</li>
          </ul>
        </div>

        <div className="dashboard-card purchase-history">
          <h3>Purchase History</h3>
          {history.length === 0 ? (
            <p className="no-history">No purchase history available.</p>
          ) : (
            history.map((h, i) => (
              <div key={i} className="purchase-item">
                {h.products.map((p, idx) => (
                  <div key={idx} className="purchase-product">
                    <h4>🛍️ {p.name}</h4>
                    <p>Price: <strong>${p.price}</strong></p>
                    <small>Purchased: {moment(p.createdAt).fromNow()}</small>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
