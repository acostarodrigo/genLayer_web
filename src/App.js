import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Box, Container, ThemeProvider } from "@mui/material";
import { ThemeChanger } from "components/ThemeChanger";
import getTheme from "theme";
import { MetaMaskProvider } from "@metamask/sdk-react";

import { PageNotFound } from "pages/PageNotFound";
import { Home } from "pages/Home/Home";
import { CustomSnackbar } from "components/CustomSnackbar";
import { CustomBackdrop } from "components/CustomBackdrop";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <BrowserRouter>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          dappMetadata: {
            name: "GenLayer",
            url: window.location.href,
          },
          infuraAPIKey: process.env.REACT_APP_BLOCKCHAIN_INFURA_ID,
        }}
      >
        <Box
          width={"100"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"flex-end"}
        >
          <ThemeChanger darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <ThemeProvider theme={getTheme(darkMode ? "dark" : "light")}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path={"*"} exact element={<PageNotFound />} />
          </Routes>
          <CustomSnackbar />
          <CustomBackdrop />
        </ThemeProvider>
      </MetaMaskProvider>
    </BrowserRouter>
  );
}

export default App;
