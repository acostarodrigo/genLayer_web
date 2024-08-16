import { light as lightBlue, dark as darkBlue } from "./palette--blue";

const palette = (themeMode = "light") => {
  return themeMode === "dark" ? darkBlue : lightBlue;
};

export default palette;
