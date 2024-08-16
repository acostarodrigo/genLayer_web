import React from "react";
import PropTypes from "prop-types";
import { Avatar, Grid, Typography } from "@mui/material";

export const HeaderCard = ({ icon, title, description }) => {
  return (
    <Grid
      container
      spacing={4}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Grid item xs={12}>
        <Avatar>{icon}</Avatar>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body">{description}</Typography>
      </Grid>
    </Grid>
  );
};

HeaderCard.prototypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
