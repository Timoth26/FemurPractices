import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Home from "./components/Home";
import Registration from "./components/registration/Registration";
import RegistrationSucceedPage from "./components/registration/RegistrationSucceedPage";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },

      taskList: [],
    };
  }

  render() {
    return (
      <main className="content">
        <Background />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/registration/succeed"
              element={<RegistrationSucceedPage />}
            />
            <Route path="/error"
            element={<ErrorPage/>}
            />
          </Routes>
        </Router>
      </main>
    );
  }
}
export default App;
