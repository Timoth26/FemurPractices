import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Home from "./page/HomePage.js";
import Registration from "./page/RegistrationPage.js";
import RegistrationSucceedPage from "./page/RegistrationSucceedPage.js";
import ErrorPage from "./page/ErrorPage.js";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import SearchPage from "./page/SearchPage.js";
import OfferPage from "./page/OfferPage.js";
import CreateOffer from "./page/CreateOffer.js";
import CandidatsPage from "./page/CandidatsPage.js";
import ScrollToTop from "./utils/ScrollToUp.js";
import EditAccount from "./page/EditAccountPage.js";
import EditAccountSucceedPage from "./page/EditAccountSucceedPage.js";
function App() {
  return (
    <main className="content">
      <Background />
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/registration/succeed"
              element={<RegistrationSucceedPage />}
            />
            <Route path="/error" element={<ErrorPage />} />

            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/offer/:offerId"
              element={
                <PrivateRoute>
                  <OfferPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/createOffer"
              element={
                <PrivateRoute>
                  <CreateOffer />
                </PrivateRoute>
              }
            />
            <Route
              path="/offer/edit/:offerId"
              element={
                <PrivateRoute>
                  <CreateOffer />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/offer/:offerId/candidats"
              element={
                <PrivateRoute>
                  <CandidatsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/account"
              element={
                <PrivateRoute>
                  <EditAccount />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/account/succeed"
              element={
                <PrivateRoute>
                  <EditAccountSucceedPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </main>
  );
}
export default App;
