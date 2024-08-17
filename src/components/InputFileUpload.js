import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  name: "foo",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ setFile }) {
  const handleFile = (e) => {
    if (e.target.files.length > 0) setFile(e.target.files[0]);
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      color="secondary"
      tabIndex={-1}
      startIcon={<ImageIcon />}
    >
      Select Image
      <VisuallyHiddenInput type="file" name="foo" onChange={handleFile} />
    </Button>
  );
}
InputFileUpload.propTypes = {
  setFile: PropTypes.func.isRequired,
};
