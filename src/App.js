import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { ThemeChanger } from "components/ThemeChanger";
import getTheme from "theme";
import { MetaMaskProvider } from "@metamask/sdk-react";

import { PageNotFound } from "pages/PageNotFound";
import { Home } from "pages/Home";
import { CustomSnackbar } from "components/CustomSnackbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
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
        <ThemeChanger darkMode={darkMode} setDarkMode={setDarkMode} />
        <ThemeProvider theme={getTheme(darkMode ? "dark" : "light")}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path={"*"} exact element={<PageNotFound />} />
          </Routes>
          <CustomSnackbar />
        </ThemeProvider>
      </MetaMaskProvider>
    </BrowserRouter>
  );
}

export default App;
