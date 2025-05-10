import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Commons/Home/home";
import Signup from "./Components/Commons/Signin/signup";
import CarPaint from "./Components/Commons/Categories/CarPaint/carPaint";
import ShoppingCart from "./Components/Commons/ShoppingCart/ShoppingCart";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Signup />} />
            <Route exact path='/shopping-cart' element={<ShoppingCart />} />
            <Route exact path='/categories/carpaint' element={<CarPaint />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;
