import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../redux/services-mp/appApi";
import Pagination from "./Pagination";
import "./DashboardProducts.css";
import { updateProducts } from "../redux/features-mp/productSlice";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  async function handleDeleteProduct(id) {
    if (window.confirm("Are you sure?")) {
      try {
        const result = await deleteProduct({
          product_id: id,
          user_id: user._id,
        });
        if (result.data) {
          // The API should return the updated list of products
          dispatch(updateProducts(result.data));
        } else {
          // If the API doesn't return the updated list, we'll update it manually
          const updatedProducts = products.filter(
            (product) => product._id !== id
          );
          dispatch(updateProducts(updatedProducts));
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  }

  function TableRow({ pictures, _id, name, price }) {
    return (
      <tr>
        <td>
          <img
            src={pictures[0].url}
            className="dashboard-product-preview"
            alt={name}
          />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <Button onClick={() => handleDeleteProduct(_id)} disabled={isLoading}>
            Delete
          </Button>
          <Link to={`/product/${_id}/edit`} className="btn btn-warning">
            Edit
          </Link>
        </td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover responsive key={products.length}>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
  );
}

export default DashboardProducts;
