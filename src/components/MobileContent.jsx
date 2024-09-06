import { Box, Typography } from "@mui/joy";
import React from "react";

const MobileContent = ({ selectedContent }) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderBottom: "solid 1px #ED6930"
      }}
    >
      <Typography level="h4" sx={{color: "#ED6930"}}>{selectedContent}</Typography>
    </Box>
  );
};

export default MobileContent;
