import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../redux/services-mp/appApi";
import axios from "../axios";
import "./NewProduct.css";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dnvszb4mw",
        uploadPreset: "ml_default",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container className="box-border ">
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4 text-xl font-medium mb-4">Create a product</h1>
            {isSuccess && (
              <Alert variant="success">Product created succesfully!</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (₹)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="Art">Art</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Pottery">Pottery</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="">
              <Button type="button" onClick={showWidget} className="mt-4 ">
                Upload Images
              </Button>
              <div className="grid grid-cols-1 gap-3 mt-10 ">
                {images.map((image) => (
                  <div className="w-24 inline-block relative">
                    <img
                      className="w-full h-24 object-cover rounded-xl"
                      src={image.url}
                    />
                    {imgToRemove != image.public_id && (
                      <i
                        className="fa fa-times-circle absolute bottom-20 text-xl cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Button
                className="mt-4"
                type="submit"
                disabled={isLoading || isSuccess}
              >
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          {" "}
          <img
            src="https://images.unsplash.com/photo-1652773899966-583e9d2f2fb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHRlY2h8ZW58MHwxfDB8d2hpdGV8&auto=format&fit=crop&w=800&q=60"
            className="ml-24"
          />{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
