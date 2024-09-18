import { Box, Typography } from "@mui/joy";
import React from "react";

const Header = () => {
  return (
    <Box sx={{ padding: "1rem 1rem 0rem 1rem" }}>
      <img
        src="https://ric.phz.fi/aHR0cHM6Ly9waHouZmkvYXBwL3VwbG9hZHMvMjAxOC8wMS9jcm9wcGVkLWZ1bGxzdGFja2xvZ28tMi5wbmc=?width=1920"
        alt="Logo"
        style={{ width: "150px", height: "auto" }}
      />
    </Box>
  );
};

export default Header;
