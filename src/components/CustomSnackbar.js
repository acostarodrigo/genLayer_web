import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "state/ui";

export const CustomSnackbar = () => {
  const { snackbar } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const handleOnClose = () => {
    dispatch(hideSnackbar());
  };
  return (
    <Snackbar open={snackbar.show} autoHideDuration={6000}>
      <Alert
        onClose={handleOnClose}
        severity={snackbar.severity || "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message || "Something went wrong."}
      </Alert>
    </Snackbar>
  );
};
