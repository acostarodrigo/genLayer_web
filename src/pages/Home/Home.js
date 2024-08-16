import React, { useEffect, useState } from "react";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { hideBackdrop, showBackdrop, showSnackbar } from "state/ui";
import InputFileUpload from "components/InputFileUpload";
import { apiUploadFile } from "utils/api";
import genToken from "utils/GenToken.json";
import { Header } from "./components/Header";

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
    const nft = "0x7d5E2c1a193ED263D0f030eeB76Fd606E2D14F46";
    dispatch(showBackdrop());
    try {
      console.log(file);
      const response = await apiUploadFile(file);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(wallet);
      console.log("====================================");
      console.log(signer);
      console.log("====================================");
      const contract = new ethers.Contract(nft, genToken.abi, signer);
      console.log("====================================");
      console.log("response", response);
      console.log("====================================");
      await contract.safeMint(wallet, response.data);
      dispatch(
        showSnackbar({ message: "Metadata generated", severity: "success" })
      );
    } catch (error) {
      dispatch(showSnackbar({ message: error.message, severity: "error" }));
    } finally {
      dispatch(hideBackdrop());
    }
  };
  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  return (
    <Container elevation={4}>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item>
          <Header />
        </Grid>
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
