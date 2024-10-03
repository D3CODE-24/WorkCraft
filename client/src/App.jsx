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

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {location.pathname.startsWith("/jobs") ? <NavbarJobs /> : <Navbar />}
      <main className="mx-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/*" element={<Jobs />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/new-product" element={<NewProduct />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
