import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    snackbar: { show: false, message: "", severity: "success" },
  },
  reducers: {
    showSnackbar: (state, payload) => {
      state.snackbar.message = payload.message;
      state.snackbar.severity = payload.severity;
      state.snackbar.show = true;
    },
    hideSnackbar: (state) => {
      state.snackbar = { show: false };
    },
  },
});

export const { showSnackbar, hideSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
