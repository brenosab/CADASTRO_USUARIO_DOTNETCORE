import React, { useCallback } from "react";
import { Form, Col } from "react-bootstrap";

const BasicInput = (props) => {
  const {
    title,
    placeholder,
    size,
    input = ["", {}, () => {}],
    type = "text",
    disabled = false,
    maxLength = "10"
  } = props;

  const [field, obj, set] = input;

  return (
    <Form.Group className="input" as={Col} md={size || 6}>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        maxLength={maxLength}
        placeholder={placeholder}
        type={type}
        value={obj[field]}
        disabled={disabled}
        onChange={useCallback(
          (e) => {
            set({ ...obj, [field]: e.target.value });
          },
          [field, obj, set]
        )}
      />
    </Form.Group>
  );
};

export default BasicInput;
