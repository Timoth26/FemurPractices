import axios from "axios";

export const getCandidats = async (offerID) => {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(offerID)

  try {
    const response = await axios.get(
      `http://localhost:8000/offer/${offerID}/candidats/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Aktualizacja stanu komponentu lub inna logika obsługi danych
    return response;
  } catch (error) {
    console.error("Błąd podczas pobierania ofert:", error);
  }
};

// https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
export const getResumeFile = async (id) => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const response = await axios.get(
      `http://localhost:8000/download-resume/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Ustawienie typu odpowiedzi na Blob
      }
    );

    return response;
  } catch (error) {
    console.error("Błąd podczas pobierania pliku resume:", error);
  }
};

const api = {
  getCandidats,
  getResumeFile,
};
export default api;