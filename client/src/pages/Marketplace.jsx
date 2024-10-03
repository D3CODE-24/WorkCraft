import React from "react";
import axios from "../axios";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import MP_Navbar from "../components/MP_Navbar";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import categories from "@/categories";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../redux/features-mp/productSlice";
import MP_ProductPreview from "@/components/MP_ProductPreview";

const Marketplace = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <MP_Navbar />
      <img
        src=" https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png "
        className="w-full"
      />
      <div className="text-center mt-5 container">
        <h1 className="text-2xl font-medium">Latest Products</h1>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <MP_ProductPreview {...product} />
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
          src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
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
