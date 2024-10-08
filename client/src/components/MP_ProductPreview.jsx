import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function MP_ProductPreview({ _id, category, name, pictures }) {
    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
            <Card style={{ width: "20rem", margin: "10px ", }}>
                <Card.Img variant="top" className="product-preview-img" src={pictures[0].url} style={{ height: "170px", objectFit: "contain" }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Badge bg="warning" text="dark">
                        {category}
                    </Badge>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default MP_ProductPreview;