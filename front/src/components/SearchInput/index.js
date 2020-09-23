import React, { useCallback } from "react";
import { InputGroup, Button, Form, Col } from "react-bootstrap";
import InputHeader from "../Inputs/inputHeader";
import { FaSearch } from "react-icons/fa";

const SearchInput = (props) => {
  const {
    title,
    description,
    placeholder,
    size,
    input = ["", {}, () => {}],
    type = "text",
    disabled = false,
    onClickHandler = () => {},
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
        <Form.Control
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
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              if (obj[field] !== "" && obj[field] !== null) onClickHandler();
            }
          }}
        />
        <InputGroup.Append>
          <Button 
            onClick={() => onClickHandler()}
            disabled={disabled}
          >
            <FaSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default SearchInput;
