import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Commons/Home/home";
import Login from "./Components/Commons/Signin/login";
import Signup from "./Components/Commons/Signin/signup";
import SetPassword from "./Components/Commons/Signin/setPassword";
import CarPaint from "./Components/Commons/Categories/CarPaint/carPaint";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signup/setpassword" element={<SetPassword />} />
            <Route exact path="/categories/carpaint" element={<CarPaint />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;
