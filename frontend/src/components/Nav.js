import React from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";
import IsLoggedIn from "../utils/IsLoggedIn";
import { useAuth } from "../context/AuthContext";

function Nav({ handleLoginClick, showButtons = true, position = true }) {
  const navigate = useNavigate();
  const userType = localStorage.getItem("type");
  let { logout } = useAuth();

  const handleClick = () => {
    handleLoginClick();
  };

  return (
    <nav
      className={`flex flex-col sm:flex-row w-screen pt-10 pl-4 pr-4 sm:pl-40 sm:pr-40 ${
        position ? "md:flex md:absolute" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        <img
          src={process.env.PUBLIC_URL + "/images/logo_transparent.png"}
          alt="Femur Logo"
          className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 cursor-pointer mb-4 sm:mb-0"
          onClick={() => navigate("/search")}
        />
        {!showButtons ? (
          ""
        ) : IsLoggedIn() ? (
          <div className="sm:flex space-x-4 flex-col sm:flex-row">
            {userType === "company" ? (
              <button
                className="black_btn mb-4 sm:mb-0"
                type="button"
                onClick={() => navigate("/createOffer")}
              >
                Utwórz rekrutację
              </button>
            ) : (
              ""
            )}
            <button
              className="black_btn mb-4 sm:mb-0"
              type="button"
              onClick={() => navigate("/edit/account")}
            >
              Moje konto
            </button>
            <button
              className="black_btn mb-4 sm:mb-0"
              type="button"
              onClick={logout}
            >
              Wyloguj się
            </button>
          </div>
        ) : (
          <div className="sm:flex space-x-4 flex-col sm:flex-row">
            <button
              className="black_btn mb-4 sm:mb-0"
              type="button"
              onClick={handleClick}
            >
              Zaloguj się
            </button>
            <button
              className="black_btn mb-4 sm:mb-0"
              type="button"
              onClick={() => navigate("/register")}
            >
              Stwórz konto
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
