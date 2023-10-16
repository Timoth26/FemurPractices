import React from 'react'
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

function RegistrationSucceedPage() {

  const navigate = useNavigate();


  return (
    <div className="justify-center text-center py-20">
      <h1 className="font-semibold text-gray-900 dark:text-gray-50">
        Rejestracja zakończona sukcesem
      </h1>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
        Na twojego maila wysłaliśmy potwierdzenie rejestracji wraz z linkiem do
        zatwierdzenia maila
      </p>
      <button
        className="black_btn"
        type="button"
        onClick={() => navigate("/")}
      >
       Zaloguj się
      </button>
    </div>
  );
}

export default RegistrationSucceedPage