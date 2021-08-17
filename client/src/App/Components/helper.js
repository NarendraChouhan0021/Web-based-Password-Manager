import React, { useState } from "react";
import { Row, Col, Toast } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const CustomContentAlert = (value) => {
  const [show, setShow] = useState(true);
  return (
    <Row>
      <Col md={12}>
        <Toast
          style={{ position: "center" }}
          onClose={() => setShow(false)}
          show={show}
          delay={value.delay}
          autohide
          className={value.className}
        >
          <Toast.Header style={{ position: "right" }}></Toast.Header>
          <Toast.Body>{value.message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};
