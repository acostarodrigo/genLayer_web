import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Tab, Typography } from "@mui/material";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { showSnackbar } from "state/ui";
import { Header } from "./components/Header";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MintNFT } from "./components/MintNFT";
import { NFTList } from "./components/NFTList";
import { Link } from "react-router-dom";

export const Home = () => {
  const [wallet, setWallet] = useState("");
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { sdk, chainId } = useSDK();

  const handleWalletConnect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts.length === 0) return;

      setWallet(ethers.getAddress(accounts[0]));
    } catch (error) {
      dispatch(showSnackbar({ message: error.message, severity: "error" }));
    }
  };

  useEffect(() => {
    if (chainId && chainId !== "0xaa36a7") {
      dispatch(
        showSnackbar({
          severity: "warning",
          message: "Only valid network for this demo is Sepolia!",
        })
      );
    }
  }, [chainId]);

  return (
    <Container>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={4}
      >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {wallet ? (
            <>
              <Box mb={5}>
                <Typography variant="body" textAlign={"center"}>
                  Smart Contract:{" "}
                  <Link
                    to={`https://sepolia.etherscan.io/address/${process.env.REACT_APP_BLOCKCHAIN_NFT_ADDRESS}`}
                    target="self"
                    rel="noreferrer"
                  >
                    {process.env.REACT_APP_BLOCKCHAIN_NFT_ADDRESS}
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange}>
                      <Tab label="Mint a new NFT" value="1" />
                      <Tab label="View your NFTs" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Container>
                      <MintNFT wallet={wallet} />
                    </Container>
                  </TabPanel>
                  <TabPanel value="2">
                    <Container>
                      <NFTList wallet={wallet} />
                    </Container>
                  </TabPanel>
                </TabContext>
              </Box>
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
