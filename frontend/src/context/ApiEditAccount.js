import axios from "axios";

export const getAccountDetails = async () => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const response = await axios.get(
      `http://localhost:8000/edit/account/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Błąd podczas pobierania ofert:", error);
  }
};

// https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
export const getResumeFile = async () => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const response = await axios.get(
      "http://localhost:8000/download-resume/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Ustawienie typu odpowiedzi na Blob
      }
    );

    return response;
  } catch (error) {
    console.error("Błąd podczas pobierania pliku résumé:", error);
  }
};

const deleteResume = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8000/delete-resume/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Po udanym usunięciu możesz obsłużyć odpowiedź, np. wyświetlić komunikat
    console.log("Resume deleted successfully");
  } catch (error) {
    console.error("Error deleting resume:", error);
  }
};

export const postAccountDetails = async (userData, navigate) => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const response = await axios.post(
      "http://localhost:8000/edit/account/post/",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ustaw nagłówek Content-Type na application/json
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/edit/account/succeed");
    return response;
  } catch (error) {
    console.error("Błąd podczas pobierania ofert:", error);
  }
};
const api = {
  getAccountDetails,
  postAccountDetails,
  getResumeFile,
  deleteResume,
};
export default api;