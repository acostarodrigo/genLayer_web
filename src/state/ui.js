import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    snackbar: { show: false, message: "", severity: "success" },
    showBackdrop: false,
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.show = true;
    },
    hideSnackbar: (state) => {
      state.snackbar = { show: false };
    },
    showBackdrop: (state) => {
      state.showBackdrop = true;
    },
    hideBackdrop: (state) => {
      state.showBackdrop = false;
    },
  },
});

export const { showSnackbar, hideSnackbar, showBackdrop, hideBackdrop } =
  uiSlice.actions;

export default uiSlice.reducer;
