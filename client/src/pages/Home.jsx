import React from "react";
import banner from "../assets/banner.png";
import Footer from "@/components/shared/Footer";

const Home = () => {
  return (
    <div className="text-center mt-0 w-full">
      <img src={banner} alt="banner" className="-mt-7" />
      <Footer/>
    </div>
  );
};

export default Home;
