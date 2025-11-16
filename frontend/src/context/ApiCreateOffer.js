import axios from "axios";

const apiCreateOffer = async (data) => {
const token = localStorage.getItem("token");
console.log("aaaa", data)
  try {
    const response = await axios.post(
      "http://localhost:8000/offer/create/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Success:", response.data);
    // navigate("/registration/succeed");
  } catch (error) {
    console.error("Error:", error.response.data);
    // navigate("/error");
  }
};

const editOffer = async (data, offerID) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `http://localhost:8000/offer/edit/${offerID}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Success:", response.data);
    // navigate("/registration/succeed");
  } catch (error) {
    console.error("Error:", error.response.data);
    // navigate("/error");
  }
};

const apiCreate = {apiCreateOffer, editOffer}
export default apiCreate;
