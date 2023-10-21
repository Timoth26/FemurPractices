import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Home from "./components/Home";
import Registration from "./components/registration/Registration";
import RegistrationSucceedPage from "./components/registration/RegistrationSucceedPage";
import ErrorPage from "./components/ErrorPage";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <main className="content">
      <Background />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/registration/succeed"
              element={<RegistrationSucceedPage />}
            />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </main>
  );
}
export default App;
