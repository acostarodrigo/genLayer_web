import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { HeaderCard } from "components/HeaderCard";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export const Header = () => {
  return (
    <Card elevation={4} style={{ margin: 4, width: "100%", padding: 30 }}>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={4}
        textAlign={"center"}
      >
        <Grid item xs={12}>
          <Typography variant="h3">GenLayer Full Stack exam</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">by Rodrigo Acosta</Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction={"row"}>
            <Grid item xs={12} md={4} mb={5}>
              <HeaderCard
                icon={<AccountBalanceWalletIcon color="primary" />}
                title={"Connect your wallet"}
                description={"Connect your Metamask wallet to start!"}
              />
            </Grid>
            <Grid item xs={12} md={4} mb={5}>
              <HeaderCard
                icon={<FileUploadIcon color="info" />}
                title={"Pick an image"}
                description={"Pick a local image that will be part of your NFT"}
              />
            </Grid>
            <Grid item xs={12} md={4} mb={5}>
              <HeaderCard
                icon={<PlayCircleOutlineIcon color="warning" />}
                title={"Sign the transaction"}
                description={"Sign the transaction and mint your NFT"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
