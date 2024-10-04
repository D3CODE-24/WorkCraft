import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarJobs from "./components/shared/NavbarJobs"; // Import job-specific navbar
import Home from "./pages/Home";
import Jobs from "./pages/JobsPortal";
import Marketplace from "./pages/Marketplace";
import Learn from "./pages/Learn";
import "bootstrap/dist/css/bootstrap.min.css";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import MP_Category from "./pages/MP-Category";
import ScrollToTop from "@/components/ScrollToTop";
import CartPage from "./pages/CartPage";
import MP_Login from "./pages/MP-Login";
import MP_Signup from "./pages/MP-Signup";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {location.pathname.startsWith("/jobs") ? <NavbarJobs /> : <Navbar />}
      <main className="mx-0">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/*" element={<Jobs />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/login" element={<MP_Login />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<MP_Category />} />
          <Route path="/signup" element={<MP_Signup />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/CartPage" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
