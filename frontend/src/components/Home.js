import React from "react";
import Nav from "./Nav";
import "../styles/global.css";
import { useState } from "react";
import LoginPopup from "./LoginPopup";
import { Link, useNavigate} from "react-router-dom"

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
      <div className="flex items-center justify-center h-screen mx-auto">
        <div className="text-left mr-40">
          <h1 className="home_main_text">Znajdź juz dziś</h1>
          <h1 className="home_main_text"> swoje wymarzone</h1>
          <h1 className="home_main_text"> praktyki!</h1>
          <br />
          <h5 className="home_main_text">W najlepszym serwisie</h5>
          <h5 className="home_main_text">rekrutacyjnym w Polsce!</h5>
          <br />
          <button className="black_btn" type="button" onClick={()=>navigate('/register')}>
            Dołącz do nas!
          </button>
        </div>
        <video
          className="w-full h-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5 rounded-lg shadow-xl shadow-grass dark:shadow-mint"
          loop
          muted
          autoPlay
          // poster={process.env.PUBLIC_URL + "/images/video-poster.jpg"}
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
