import axios from "axios";

export const getOffer = async (offerID) => {
  const token = localStorage.getItem("token");
  console.log(token);
  try {
    const response = await axios.get(`http://localhost:8000/offer/${offerID}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    // Aktualizacja stanu komponentu lub inna logika obsługi danych
    return response;
  } catch (error) {
    console.error("Błąd podczas pobierania ofert:", error);
  }
};

export const changeOfferStatus = async (offerID, statusRequest) => {
  const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:8000/offer/${offerID}/close/`, {status: statusRequest},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      // Aktualizacja stanu komponentu lub inna logika obsługi danych
      return response;
    } catch (error) {
      console.error("Błąd podczas zamykania oferty:", error);
    }
}

const api = { getOffer, changeOfferStatus};
export default api;