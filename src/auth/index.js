import { API } from "../config";

 export const signup = user => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json()) // ✅ FIXED: return JSON
    .catch(err => {
      console.log(err);
    });
  };

   export const signin = user => {
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json()) // ✅ FIXED: return JSON
    .catch(err => {
      console.log(err);
    });
  };

  export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
  }

  export const signout = next => {
  if (typeof window !== "undefined") {
    // Remove token from localStorage (client-side logout)
    localStorage.removeItem("jwt");

    // Call backend to handle server-side logout
    return fetch(`${API}/signout`, {
      method: "POST"
    })
      .then(response => {
        console.log("Signout response:", response);
        next(); // Now call the callback after server response
      })
      .catch(err => console.log("Signout error:", err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  const jwt = localStorage.getItem("jwt");

  // Catch empty, undefined, or invalid string values
  if (!jwt || jwt === "undefined" || jwt === "null") {
    return false;
  }

  try {
    const parsedJwt = JSON.parse(jwt);

    // Optional: validate JWT structure
    if (!parsedJwt.token) {
      return false;
    }

    // Optional: check if expired (example assumes `expiresAt` is a timestamp in ms)
    if (parsedJwt.expiresAt && Date.now() > parsedJwt.expiresAt) {
      localStorage.removeItem("jwt"); // auto-clean expired token
      return false;
    }

    return parsedJwt;
  } catch (err) {
    console.error("Failed to parse JWT from localStorage", err);
    return false;
  }
};


