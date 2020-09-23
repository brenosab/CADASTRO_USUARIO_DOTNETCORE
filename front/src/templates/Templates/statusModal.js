import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLR_ERROR_STATE } from "../../store/actions";
import { Modal, Col, Button, Row, Container } from "react-bootstrap";
import Line from "../../components/Line";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const StatusModal = () => {
  const { appState } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Modal show={appState.status !== undefined} size="md">
      <Modal.Header>
        <h2>
          {appState.status === "error"
            ? "Erro"
            : appState.status === "warning"
            ? "Atenção"
            : "Sucesso"}
        </h2>
      </Modal.Header>
      {typeof appState.status === "string" && (
        <Modal.Body as={Container}>
          <Row>
            <Col md={4} style={{ padding: 15 }}>
              {appState.status === "error" ? (
                <FaExclamationCircle color="red" size={125} />
              ) : appState.status === "warning" ? (
                <FaExclamationTriangle color="#fff014" size={125} />
              ) : (
                <FaCheckCircle color="green" size={125} />
              )}
            </Col>
            <Col md={8}>
              <Row>Message</Row>
              <Line
                style={{ marginTop: 10, marginBottom: 10, marginLeft: -15 }}
              />
              {appState.messages &&
                appState.messages.map((item, index) => (
                  <Row key={index}>
                    <Col md={12}>{item}</Col>
                  </Row>
                ))}
              {appState.errors &&
                process.env.NODE_ENV === "development" &&
                appState.errors.map((item, index) => (
                  <Row key={index}>
                    <Col md={12}>{JSON.stringify(item)}</Col>
                  </Row>
                ))}
            </Col>
          </Row>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Col md={4}>
          <Button
            onClick={useCallback(() => {
              dispatch({ type: CLR_ERROR_STATE });
            }, [dispatch])}
          >
            Fechar
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusModal;
