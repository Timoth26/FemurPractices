import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
let email = localStorage.getItem("email");

  return !email ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
