import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("adasdas", response)
      const { access, refresh } = response.data;
      const decodedToken = jwtDecode(access);
      const email = decodedToken.email;
      const type = decodedToken.type;

      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("email", email);
      localStorage.setItem("type", type)

      setAuthToken(access);
      navigate("/search");
      return true;
    } catch (error) {
      console.error("Login Error: ", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    setAuthToken(null); // Usunięcie tokena JWT z nagłówka
    navigate("/");
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logout();
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/token/refresh/",
        { refresh: refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccessToken = response.data.access;

      localStorage.setItem("token", newAccessToken);
      setAuthToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Refresh Token Error: ", error);
      logout();
    }
  };

  useEffect(() => {
    // Refresh token every 4 minutes (240000 milliseconds)
    const refreshInterval = setInterval(() => {
      refreshAccessToken();
    }, 120000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Check if the user is logged in while the page is loading and refresh expired token
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          await refreshAccessToken();
        } else {
          setAuthToken(token);
        }
      }
    };

    checkLoggedInUser();
  }, []);

  const contextFunctions = {
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextFunctions}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
