import { createContext, useState, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const login = async (e) => {
    e.preventDefault();
    console.error("URUCHOMIONO");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { access, refresh } = response.data;
      const decodedToken = jwtDecode(access)
      const email = decodedToken.email;

      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('email', email);

    } catch (error) {
      console.error("Login Error: ", error);
    }
    
  };

  const logout = (e) => {
    e.preventDefault();
    // Implement your logout logic if needed
  };

  const contextFunctions = {
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextFunctions}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
