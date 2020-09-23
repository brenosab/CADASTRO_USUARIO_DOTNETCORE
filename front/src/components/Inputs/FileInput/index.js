import React, { useCallback } from "react";
import { Form, Col, InputGroup } from "react-bootstrap";
import InputHeader from "../inputHeader";
import bsCustomFileInput from "bs-custom-file-input";
import { FaPaperclip } from "react-icons/fa";

const FileInput = (props) => {
  const {
    title,
    description,
    size,
    accept = [],
    input = ["", {}, () => {}],
    disabled = false,
    required = false,
  } = props;

  const [field, obj, set] = input;

  bsCustomFileInput.init();
  return (
    <Form.Group className="input" as={Col} md={size || 6}>
      <InputHeader
        title={title}
        description={description}
        required={required}
      />
      <InputGroup>
        <InputGroup.Prepend
          style={{
            backgroundColor: "#e9ecef",
            padding: 11,
            borderRadius: 5,
          }}
        >
          <FaPaperclip />
        </InputGroup.Prepend>
        <Form.File             custom
>
          <Form.File.Label>
            {obj[field] === null ? "Selecionar Imagem" : obj[field].name}
          </Form.File.Label>
          <Form.File.Input
            accept={accept}
            disabled={disabled}
            onChange={useCallback(
              (e) => {
                console.log(e.target.files[0]);
                set({ ...obj, [field]: e.target.files[0] });
              },
              [field, obj, set]
            )}
          />
        </Form.File>
      </InputGroup>
    </Form.Group>
  );
};

export default FileInput;
