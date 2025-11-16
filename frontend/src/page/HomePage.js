import React from "react";
import Nav from "../components/Nav";
import "../styles/global.css";
import { useState } from "react";
import LoginPopup from "../components/LoginPopup";
import { useNavigate } from "react-router-dom";
import IsLoggedIn from "../utils/IsLoggedIn";

function Home() {
  const [isShowLogin, setIsShowLogin] = useState(false);

  const navigate = useNavigate();

  const handleLoginclick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  const handleCloseLoginPopup = () => {
    setIsShowLogin(false);
  };

  return (
    <>
      <Nav handleLoginClick={handleLoginclick} />
      <LoginPopup isShowLogin={isShowLogin} onClose={handleCloseLoginPopup} />
      <div className="flex flex-col lg:flex-row items-center justify-center lg:h-screen mx-auto">
        <div className="text-left lg:mr-40 mb-8 lg:mb-0 ">
          <h1 className="home_main_text">Znajdź już dziś</h1>
          <h1 className="home_main_text">swoje wymarzone</h1>
          <h1 className="home_main_text">praktyki!</h1>
          <br />
          <h5 className="home_main_text">W najlepszym serwisie</h5>
          <h5 className="home_main_text">rekrutacyjnym w Polsce!</h5>
          <br />
          {IsLoggedIn() ? (
            <button
              className="black_btn mt-4 lg:mt-8"
              type="button"
              onClick={() => navigate("/search")}
            >
              Zacznij szukać
            </button>
          ) : (
            <button
              className="black_btn mt-4 lg:mt-8"
              type="button"
              onClick={() => navigate("/register")}
            >
              Dołącz do nas!
            </button>
          )}
        </div>
        <video
          className="hidden lg:block w-full h-auto lg:w-1/3 xl:w-2/5 rounded-lg shadow-xl shadow-grass dark:shadow-mint"
          loop
          muted
          autoPlay
        >
          <source
            src={process.env.PUBLIC_URL + "/images/video1.webm"}
            type="video/webm"
          />
          <source
            src={process.env.PUBLIC_URL + "/images/video1.mp4"}
            type="video/mp4"
          />
          Twoja przeglądarka nie obsługuje tagu wideo.
        </video>
      </div>
    </>
  );
}

export default Home;
