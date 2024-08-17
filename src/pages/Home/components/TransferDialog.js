import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";

import genToken from "utils/GenToken.json";
import { useDispatch } from "react-redux";
import { hideBackdrop, showBackdrop, showSnackbar } from "state/ui";

export const TransferDialog = ({ wallet, tokenId, open, setOpen }) => {
  const [address, setAddress] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleAddresschange = (e) => {
    setAddress(e.target.value);

    if (ethers.isAddress(e.target.value)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleClose = () => {
    setAddress("");
    setIsDisabled(true);
    setOpen(false);
  };

  const handleTransfer = async () => {
    const nft = process.env.REACT_APP_BLOCKCHAIN_NFT_ADDRESS;
    dispatch(showBackdrop());
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(wallet);
      const contract = new ethers.Contract(nft, genToken.abi, signer);
      await contract.safeTransferFrom(wallet, address, tokenId);
      dispatch(
        showSnackbar({
          message: "NFT transfer successfully",
          severity: "success",
        })
      );
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
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Transfer Token ID {tokenId}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body">
            Specify a valid Ethereum address on network Sepolia and confirm to
            transfer.
          </Typography>
          <Input
            value={address}
            placeholder="0x6a51585C1B892380090A790AbA2Eb59e173d355f"
            fullWidth
            onChange={handleAddresschange}
            error={isDisabled}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleTransfer} autoFocus disabled={isDisabled}>
          Confirm!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TransferDialog.propTypes = {
  wallet: PropTypes.string.isRequired,
  tokenId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
