import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import SimilarProduct from "@/components/SimilarProduct";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "@/redux/services-mp/appApi";
import ToastMessage from "@/components/ToastMessage";
import MP_Navbar from "@/components/MP_Navbar";

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [itemNumber, setItemNumber] = useState(1);

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      className="max-w-full object-cover max-h-96"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  return (
    <Container
      fluid
      className="pt-0 pr-0 pl-5 w-full -mt-6"
      style={{ position: "relative" }}
    >
      <MP_Navbar />
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4 ">
          <h1 className="text-3xl text-center ">{product.name}</h1>
          <p className="text-center text-lg mt-2">
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p className="text-xl text-center mt-2">₹{product.price}</p>
          <p style={{ textAlign: "justify" }} className="py-3 text-lg">
            <strong>Description:</strong> {product.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup className="mb-3 rounded-2xl" style={{ width: "90%" }}>
              <Form.Select
                onChange={(e) => setItemNumber(e.target.value)}
                className="rounded-2xl"
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <Button
                size="lg"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    noItems: itemNumber,
                  })
                }
              >
                Add to cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Added to cart"
              body={`${product.name} is in your cart`}
            />
          )}
        </Col>
      </Row>
      <div className="my-4">
        <h2>Similar Products</h2>
        {/* {console.log(similarProducts)} */}
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
