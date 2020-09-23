import React from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

const InputHeader = (props) => {
  const {
    title,
    description,
    required = false,
  } = props;

  return (
    <Form.Label>
      {title + " "}
      {required ? <em className="warningRequired">* </em> : <> </>}
      {description && (
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>{description}</Tooltip>}
        >
          <em>
            <FaExclamationCircle />
          </em>
        </OverlayTrigger>
      )}
    </Form.Label>
  );
};

export default InputHeader;
