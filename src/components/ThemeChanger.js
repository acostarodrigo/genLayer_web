import React from "react";
import PropTypes from "prop-types";
import { Box, FormControlLabel, Grid, Switch } from "@mui/material";

export const ThemeChanger = ({ darkMode, setDarkMode }) => {
  const handleChange = () => {
    setDarkMode((current) => !current);
  };
  return (
    <Grid container justifyContent="flex-end">
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleChange} />}
        label="Dark mode"
      />
    </Grid>
  );
};

ThemeChanger.propTypes = {
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func.isRequired,
};
