import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

function ErrorPage({error}) {

  const navigate = useNavigate();

  return (
    <>
      <div className="justify-center text-center py-20">
        <h1 className="font-semibold text-gray-900 dark:text-gray-50">
          Coś poszło nie tak...
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          Spróbuj ponownie później
        </p>
        <button
          className="black_btn"
          type="button"
          onClick={() => navigate("/")}
        >
          Wróc do strony głównej
        </button>
      </div>
    </>
  );
}

export default ErrorPage