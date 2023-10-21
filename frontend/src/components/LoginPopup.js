import React, { useEffect, useRef, useContext } from "react";
import "../styles/global.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPopup({ isShowLogin, onClose }) {
  const wrapperRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  let { login } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/token/", // Zmień na właściwy endpoint logowania
  //       { email, password },
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     const { access_token, refresh_token } = response.data;

  //     // Zapisz tokeny w lokalnym składowaniu (localStorage)
  //     localStorage.setItem("access_token", access_token);
  //     localStorage.setItem("refresh_token", refresh_token);

  //     // Ustaw nagłówek autoryzacji dla przyszłych żądań
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${access_token}`;

  //     // Zamknij okno logowania
  //     onClose();
  //     console.log(access_token)
  //     navigate('/register')
      
  //   } catch (error) {
  //     console.error("Błąd logowania", error);
  //     alert("ERROR")
  //   }
  // };

  return (
    <div
      className={`${
        isShowLogin ? "show" : "hide"
      } show fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0s">
        <div
          ref={wrapperRef}
          id="login-form"
          className="w-full bg-lightgray rounded-lg shadow dark:border-1 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-50">
                Zaloguj się do swojego konta
              </h1>
              <svg
                width="18"
                viewBox="0 0 24 24"
                className="dark:fill-gray-50 hover:fill-grass dark:hover:fill-mint"
                onClick={handleClose}
              >
                <path d="M22.829 9.172 18.95 5.293a1 1 0 0 0-1.414 1.414l3.879 3.879a2.057 2.057 0 0 1 .3.39c-.015 0-.027-.008-.042-.008L5.989 11a1 1 0 0 0 0 2l15.678-.032c.028 0 .051-.014.078-.016a2 2 0 0 1-.334.462l-3.879 3.879a1 1 0 1 0 1.414 1.414l3.879-3.879a4 4 0 0 0 0-5.656Z" />
                <path d="M7 22H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h2a1 1 0 0 0 0-2H5a5.006 5.006 0 0 0-5 5v14a5.006 5.006 0 0 0 5 5h2a1 1 0 0 0 0-2Z" />
              </svg>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={login}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
                >
                  Twój email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hasło
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Zapamiętaj mnie
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Zapomniałeś hasła?
                </a>
              </div>
              <div className="flex items-center justify-center">
                <button type="submit" className="black_btn">
                  Zaloguj się
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Nie masz jeszcze konta?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Zarejestruj się
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
