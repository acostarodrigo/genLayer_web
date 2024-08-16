import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const CustomBackdrop = () => {
  const { showBackdrop } = useSelector((state) => state.ui);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
