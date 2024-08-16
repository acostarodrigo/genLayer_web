import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { showSnackbar } from "state/ui";
import InputFileUpload from "components/InputFileUpload";
import { apiUploadFile } from "utils/api";

export const Home = () => {
  const [wallet, setWallet] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const handleWalletConnect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts.length === 0) return;

      setWallet(ethers.getAddress(accounts[0]));
    } catch (error) {
      dispatch(showSnackbar({ message: error.message, severity: "error" }));
    }
  };
  const uploadFile = async () => {
    try {
      console.log(file);
      const response = await apiUploadFile(file);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  return (
    <Container>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item mt={10}>
          <Card style={{ margin: 20, padding: 20 }}>
            <Typography variant="h3" color={"secondary"}>
              GenLayer Full Stack exam
            </Typography>
            <Typography variant="body" color={"secondary"}>
              (Thankfully, not a designer exam)
            </Typography>
          </Card>
        </Grid>

        <Grid item>
          {wallet ? (
            <>
              <Typography>{wallet}</Typography>
              <InputFileUpload setFile={setFile} />
            </>
          ) : (
            <Button
              fullWidth
              variant={"contained"}
              onClick={handleWalletConnect}
            >
              Connect your Metamask wallet
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
