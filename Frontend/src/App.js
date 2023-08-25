import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import UserRegistration from "./components/Auth/UserRegistration";
import UserLogin from "./components/Auth/UserLogin";
import StoreRegistration from "./components/Auth/StoreRegistration";
import StoreLogin from "./components/Auth/StoreLogin";
import ProductManagement from "./components/Product/ProductManagement";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/store-registration" element={<StoreRegistration />} />
          <Route path="/store-login" element={<StoreLogin />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
