import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={4}
    >
      <Grid item mt={20}>
        <ErrorIcon color="error" />
      </Grid>
      <Grid item>
        <Typography variant="h3" color={"error"}>
          404!
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body">
          This is not the page you are looking for.
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="error" onClick={() => navigate(-1)}>
          Go Back!
        </Button>
      </Grid>
    </Grid>
  );
};
