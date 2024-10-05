import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "../axios";
import "./Marketplace.css";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import MP_Navbar from "../components/MP_Navbar";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import categories from "@/categories";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../redux/features-mp/productSlice";
import MP_ProductPreview from "@/components/MP_ProductPreview";
import mp_banner from "../assets/image3.png"
import mp_banner2 from "../assets/banner2.jpeg"

const Marketplace = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  let lastProducts;
  if (!(products instanceof Array)) {
    lastProducts = [products];
    lastProducts = lastProducts.slice(0, 20);
  } else {
    lastProducts = products.slice(0, 20);
  }
  console.log(lastProducts);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div className="-mt-7">
      <MP_Navbar />

      <img
        src={mp_banner}
        className="w-full "
      />
      <div className="text-center mt-5 container">
        <h1 className="text-2xl font-medium mb-3">Latest Products</h1>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <MP_ProductPreview {...product} />
            </Link>
          ))}
        </div>
        <div>
          <Link
            className="block text-right no-underline text-blue-600 text-lg mb-3"
            to="/category/all"
          >
            See all{">>"}
          </Link>
        </div>
      </div>
      <div className="justify-center">
        <img
          src={mp_banner2}
          className="ml-20"
        />
      </div>
      <div className="container mt-4 ">
        <h1 className="text-2xl font-medium text-center mb-2">Categories</h1>
        <Row>
          {" "}
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="h-64 bg-cover bg-center pl-5 pr-5 flex justify-center items-center bg-white text-white text-2xl cursor-pointer transition-all duration-300 mt-8 hover:scale-105"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Marketplace;
