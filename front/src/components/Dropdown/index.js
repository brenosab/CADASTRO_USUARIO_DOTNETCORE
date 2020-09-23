import React from "react";
import { Col, Form } from "react-bootstrap";

const Dropdowns = (props) => {
  const { title, size, disabled = false, input = ["", {}, () => {}], itens = [] } = props;

  const [field, obj, set] = input;

  return (
    <Form.Group className="input" as={Col} md={size || 4}>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as="select"
        disabled={disabled}
        value={obj[field]}
        onChange={(e) => {
          set({ ...obj, [field]: e.target.value });
        }}
      >
        <option value={""}>Nenhuma das opções</option>
        {itens &&
          itens.map((value, index) => (
            <option key={index} value={value.id + " - " + value.descricao}>
              {value.id} - {value.descricao}
            </option>
          ))}
      </Form.Control>
    </Form.Group>
  );
};

export default Dropdowns;
