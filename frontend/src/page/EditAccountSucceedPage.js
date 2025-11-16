import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function EditAccountSucceedPage() {
  const navigate = useNavigate();

  return (
    <div className="justify-center text-center py-20">
      <h1 className="font-semibold text-gray-900 dark:text-gray-50">
        Edycja konta zakończona sukcesem
      </h1>
      <button className="black_btn" type="button" onClick={() => navigate("/search")}>
        Powrót
      </button>
    </div>
  );
}

export default EditAccountSucceedPage;
