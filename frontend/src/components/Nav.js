import React from "react";
import "../styles/global.css";
import { Link, useNavigate} from "react-router-dom"

function Nav({ handleLoginClick }) {

  const navigate = useNavigate();


  const handleClick = () => {
    handleLoginClick();
  };

  return (
    <nav className="flex-between w-screen pt-1 pl-40 pr-40 position-absolute">
      <div className="flex justify-between items-center">
        <img
          src={process.env.PUBLIC_URL + "/images/logo3.png"}
          alt="Femur Logo"
          className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        />
        <div className="sm:flex space-x-4 ml-auto">
          <button className="black_btn" type="button" onClick={handleClick}>
            Zaloguj się
          </button>
          <button className="black_btn" type="button" onClick={()=>navigate('/register')}>
            Stwórz konto
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
