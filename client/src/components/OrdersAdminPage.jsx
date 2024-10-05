import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";

function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products); // Products from Redux state
  const [orderToShow, setOrderToShow] = useState([]); // Products to show in the modal
  const [show, setShow] = useState(false); // Modal visibility state

  const handleClose = () => setShow(false);

  function markShipped(orderId, ownerId) {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }

  function showOrder(productsObj) {
    // Log productsObj and products to inspect
    console.log("Products Obj:", productsObj);
    console.log("Products:", products);

    // Filter products based on product ID, matching with productsObj
    const productsToShow = products
      .filter((product) => productsObj[product._id] !== undefined) // Check if product ID exists in productsObj
      .map((product) => {
        const productCopy = { ...product };
        productCopy.count = productsObj[product._id].count; // Set count from productsObj
        productCopy.total = productsObj[product._id].total; // Assign total from productsObj
        return productCopy;
      });

    setShow(true);
    setOrderToShow(productsToShow);  // Set the products to be displayed in the modal
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">No orders yet</h1>;
  }

  function TableRow({ _id, count, owner, total, status, products, address }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>{owner?.name}</td>
        <td>{count}</td>
        <td>{total}</td>
        <td>{address}</td>
        <td>
          {status === "processing" ? (
            <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
              Mark as shipped
            </Button>
          ) : (
            <Badge bg="success">Shipped</Badge>
          )}
        </td>
        <td>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showOrder(products)}
          >
            View order <i className="fa fa-eye"></i>
          </span>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Client Name</th>
            <th>Items</th>
            <th>Order Total</th>
            <th>Address</th>
            <th>Shipping Status</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={10}
            tablePagination={true}
          />
        </tbody>
      </Table>

      {/* Modal for displaying order details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderToShow.length === 0 ? (
            <p>No products found in this order.</p>
          ) : (
            orderToShow.map((order, index) => (
              <div
                key={index}
                className="order-details__container d-flex justify-content-around py-2"
              >
                <img
                  src={order.pictures[0].url}  // Use order.pictures[0].url for product images
                  style={{ maxWidth: 100, height: 100, objectFit: "cover" }}
                  alt={order.name}
                />
                <p>
                  <span>{order.count} x </span> {order.name}
                </p>
                <p>Price: ₹{Number(order.price) * order.count}</p>  {/* Calculate total price */}
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrdersAdminPage;
