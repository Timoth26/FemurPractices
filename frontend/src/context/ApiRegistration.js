import axios from "axios";

const registerUser = async (userData, navigate) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/create/",
      userData
    );
    console.log("Success:", response.data);
    navigate("/registration/succeed");
  } catch (error) {
    console.error("Error:", error.response.data);
    // navigate("/error")
  }
};

export default registerUser;

