import axios from "axios";

export const getOffers = async (searchParams) => {
    const token = localStorage.getItem("token");
    console.log(token)
    console.log(searchParams);

  try {
    const response = await axios.get("http://localhost:8000/search/", {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: searchParams,
    });

    console.log("adasdsa", response.data);
    // Aktualizacja stanu komponentu lub inna logika obsługi danych
    return response
  } catch (error) {
    console.error("Błąd podczas pobierania ofert:", error);
  }
};

export default getOffers;
