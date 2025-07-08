import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Commons/Home/home";
import Signup from "./Components/Commons/Signin/signup";
import MainCategoryPage from "./Components/Commons/Categories/mainCategoryPage";
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
            <Route exact path='/category/:maincategory' element={<MainCategoryPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;
