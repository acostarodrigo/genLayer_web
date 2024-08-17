import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { TransferDialog } from "pages/Home/components/TransferDialog";
import { shortenAddress } from "utils/misc";

export const NFTCard = ({ tokenId, ipfsMetadata, wallet }) => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const getNFT = useCallback(async () => {
    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${ipfsMetadata}`);

      if (response.status == 200) {
        if (!response.data?.image.includes("ipfs://")) return;
        setMetadata(response.data);
        const { image } = response.data;
        const imageResponse = await axios.get(
          `https://ipfs.io/ipfs/${image.replace("ipfs://", "")}`,
          { responseType: "arraybuffer" }
        );
        if (imageResponse.status == 200) {
          const base64 = btoa(
            new Uint8Array(imageResponse.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          setImage(base64);
        }
      }
    } catch (error) {
      return <></>;
    }
  }, []);
  useEffect(() => {
    getNFT();
  }, []);

  return (
    <>
      {metadata ? (
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <AccountBalanceWalletIcon />
              </Avatar>
            }
            title={`Token id ${tokenId}`}
            subheader={metadata?.description}
          />
          {image ? (
            <CardMedia
              component="img"
              width={"100%"}
              style={{ xs: { maxWidth: 300, md: "100%" } }}
              src={`data:image/jpeg;charset=utf-8;base64,${image}`}
              title="nft"
            />
          ) : (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={200}
              animation={"wave"}
            />
          )}
          <CardContent>
            <Typography variant="h5" textAlign={"center"}>
              {" "}
              Metadata
            </Typography>
            {
              <pre>
                {JSON.stringify(
                  { ...metadata, image: shortenAddress(metadata.image) },
                  null,
                  2
                )}
              </pre>
            }
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              color="success"
              component={Link}
              to={`https://testnets.opensea.io/assets/sepolia/${process.env.REACT_APP_BLOCKCHAIN_NFT_ADDRESS}/${tokenId}`}
              target="self"
              rel="noreferrer"
            >
              Sell at Opensea
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={() => setOpenDialog(true)}
            >
              Transfer NFT
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <CircularProgress />
        </Box>
      )}
      <TransferDialog
        open={openDialog}
        setOpen={setOpenDialog}
        wallet={wallet}
        tokenId={tokenId}
      />
    </>
  );
};
