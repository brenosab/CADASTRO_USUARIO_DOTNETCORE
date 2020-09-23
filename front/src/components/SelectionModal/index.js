import React from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";

const SelectionModal = (props) => {
  const {
    title,
    show = false,
    cols = [],
    list = [],
    ButtonChildre,
    onClick = () => {},
    onHide = () => {},
  } = props;

  return (
    <Modal show={show} onHide={() => onHide()} size="lg">
      <Modal.Header closeButton>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        {list.map((item, index) => (
          <Form.Group as={Row} key={index}>
            {cols.map((col) => (
              <Col key={col.key}>{item[col.key]}</Col>
            ))}
            <Col>
              <Button onClick={() => onClick(item)}>
                {ButtonChildre ? ButtonChildre : "Selecionar"}
              </Button>
            </Col>
          </Form.Group>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default SelectionModal;
