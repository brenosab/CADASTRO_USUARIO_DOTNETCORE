import React from "react";
import { Container, Spinner } from "react-bootstrap";

const REQUEST_INITIATE_MESSAGE = "Carregando...";

const LoadingToast = () => {
  return (
    <Container style={{ alignItens: "center" }}>
      <Spinner animation="grow" variant="primary" />
      <small style={{ paddingLeft: 10 }}>{REQUEST_INITIATE_MESSAGE}</small>
    </Container>
  );
};

export default LoadingToast;
