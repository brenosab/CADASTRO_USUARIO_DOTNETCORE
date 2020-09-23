import React, { useCallback } from "react";
import {
  Form,
  Col,
  InputGroup,
} from "react-bootstrap";
import NumberFormat from "react-number-format";
import InputHeader from "../inputHeader";

const CurrencyInput = (props) => {
  const {
    title,
    description,
    size,
    input = ["", {}, () => {}],
    disabled = false,
    required = false,
  } = props;

  const [field, obj, set] = input;

  return (
    <Form.Group className="input" as={Col} md={size || 6}>
      <InputHeader
        title={title}
        description={description}
        required={required}
      />
      <InputGroup>
        <InputGroup.Text style={{ color: "#bdbdbd" }}>R$</InputGroup.Text>
        <NumberFormat
          value={obj[field]}
          onChange={useCallback(
            (e) => {
              set({ ...obj, [field]: e.target.value });
            },
            [field, obj, set]
          )}
          disabled={disabled}
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          customInput={Form.Control}
        />
      </InputGroup>
    </Form.Group>
  );
};

export default CurrencyInput;
