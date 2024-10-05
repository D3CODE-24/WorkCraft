import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import NavbarJobs from "./components/shared/NavbarJobs"; // Import job-specific navbar
import Home from "./pages/Home";
import JobsPortal from "./pages/JobsPortal";
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
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProductPage from "./pages/EditProductPage";
import MP_Navbar from "./components/MP_Navbar";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100">
      {location.pathname.startsWith("/jobs") ? <NavbarJobs /> : <Navbar />},
      {location.pathname.startsWith("/jobs") ? <MP_Navbar /> : <Navbar />}
      
      <main className="mx-0">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/*" element={<JobsPortal />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/learn" element={<Learn />} />

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<MP_Category />} />

          <Route path="/marketplace/login" element={<MP_Login />} />
          <Route path="/marketplace/signup" element={<MP_Signup />} />

          <Route path="/marketplace/new-product" element={<NewProduct />} />
          <Route path="/marketplace/cart" element={<CartPage />} />

          <Route path="/marketplace/orders" element={<OrdersPage />} />
          <Route path="/marketplace/admin" element={<AdminDashboard />} />
          <Route path="/marketplace/product/:id/edit" element={<EditProductPage />} />

          
          

        </Routes>
      </main>
    </div>
  );
}

export default App;
