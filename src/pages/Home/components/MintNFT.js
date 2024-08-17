import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { isMobile } from "react-device-detect";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";

import InputFileUpload from "components/InputFileUpload";
import { hideBackdrop, showBackdrop, showSnackbar } from "state/ui";
import { apiUploadFile } from "utils/api";
import genToken from "utils/GenToken.json";

export const MintNFT = ({ wallet }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleMint = async () => {
    const nft = process.env.REACT_APP_BLOCKCHAIN_NFT_ADDRESS;
    dispatch(showBackdrop());
    try {
      const response = await apiUploadFile(file);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(wallet);
      const contract = new ethers.Contract(nft, genToken.abi, signer);
      await contract.safeMint(wallet, response.data);
      dispatch(
        showSnackbar({
          message: "NFT minted. Shortly will be available.",
          severity: "success",
        })
      );
      setFile(null);
      setImage(null);
    } catch (error) {
      if (error.message.includes("user rejected")) {
        dispatch(
          showSnackbar({
            message: "You rejected the transaction",
            severity: "warning",
          })
        );
        return;
      }
      dispatch(showSnackbar({ message: error.message, severity: "error" }));
    } finally {
      dispatch(hideBackdrop());
    }
  };
  useEffect(() => {
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <>
      <Box width={"100%"}>
        <Typography variant="h5" textAlign={"center"} mb={2}>
          What are we doing on this page?
        </Typography>
        <Stepper nonLinear orientation={isMobile ? "vertical" : "horizontal"}>
          <Step completed>
            <StepLabel>
              <Typography variant="body1" color={"primary"}>
                After image is picked is submitted to API
              </Typography>
            </StepLabel>
          </Step>
          <Step completed>
            <StepLabel>
              <Typography variant="body1" color={"primary"}>
                API uploads image to IPFS and retrieves the URL
              </Typography>
            </StepLabel>
          </Step>
          <Step completed>
            <StepLabel>
              <Typography variant="body1" color={"primary"}>
                API generates metadata file and submits to IPFS
              </Typography>
            </StepLabel>
          </Step>
          <Step completed>
            <StepLabel>
              <Typography variant="body1" color={"primary"}>
                We call safeMint on the contract with metadata address and wait
                for signature
              </Typography>
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
      <Stack
        spacing={2}
        direction={"column"}
        mt={4}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        {image ? (
          <img src={image} width={500} height={500} />
        ) : (
          <Card
            elevation={4}
            style={{ backgroundColor: "#f6f3f3", width: 500, height: 500 }}
          >
            <CardContent>
              <Box
                display={"flex"}
                mt={25}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  variant="body2"
                  color={"error"}
                  textAlign={"center"}
                >
                  [Select an image]
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
        <Stack spacing={2} direction={"row"} textAlign={"center"}>
          <Box textAlign={"center"}>
            <InputFileUpload setFile={setFile} />
          </Box>
          <Box textAlign={"center"}>
            <Button
              variant="contained"
              color="warning"
              disabled={!image}
              onClick={handleMint}
            >
              {" "}
              Mint NFT!
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

MintNFT.prototypes = {
  wallet: PropTypes.string.isRequired,
};
