import React from "react";

import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";

import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";
import VapesPage from "./pages/VapesPage";
import { Checkout } from "./pages/Checkout";
import AdminDashboard from "./pages/ADashboard";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/vapes" element={<VapesPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
