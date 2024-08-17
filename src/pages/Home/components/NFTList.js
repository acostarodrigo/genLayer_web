import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";

import genToken from "utils/GenToken.json";
import { NFTCard } from "components/NFTCard";
import { Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";

export const NFTList = ({ wallet }) => {
  const [tokenList, setTokenList] = useState([]);
  const getBalance = useCallback(async () => {
    const nft = process.env.REACT_APP_BLOCKCHAIN_NFT_ADDRESS;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(wallet);
    const contract = new ethers.Contract(nft, genToken.abi, signer);
    const balance = await contract.balanceOf(wallet);

    for (let i = 0; i < balance; i++) {
      try {
        const tokenId = await contract.tokenOfOwnerByIndex(wallet, i);
        const metadata = await contract.tokenURI(tokenId);
        setTokenList((current) => [
          ...current,
          { tokenId, ipfsMetadata: metadata.replace("ipfs://", "") },
        ]);
      } catch (error) {
        continue;
      }
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [wallet]);

  return (
    <>
      <Typography variant="h5" textAlign={"center"} mb={2}>
        What are we doing on this page?
      </Typography>
      <Stepper nonLinear>
        <Step completed>
          <StepLabel>
            <Typography variant="body1" color={"primary"}>
              We get balance from contract
            </Typography>
          </StepLabel>
        </Step>
        <Step completed>
          <StepLabel>
            <Typography variant="body1" color={"primary"}>
              We get token id from contract
            </Typography>
          </StepLabel>
        </Step>
        <Step completed>
          <StepLabel>
            <Typography variant="body1" color={"primary"}>
              We get metadata IPFS address and retrieve
            </Typography>
          </StepLabel>
        </Step>
        <Step completed>
          <StepLabel>
            <Typography variant="body1" color={"primary"}>
              We get image IPFS address and display
            </Typography>
          </StepLabel>
        </Step>
      </Stepper>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        mt={5}
      >
        {tokenList.map((token) => (
          <Grid item xs={12} md={6} key={token.tokenId}>
            <NFTCard
              tokenId={token.tokenId}
              ipfsMetadata={token.ipfsMetadata}
              wallet={wallet}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

NFTList.prototypes = {
  wallet: PropTypes.string.isRequired,
};
