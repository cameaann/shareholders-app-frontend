import { Box, Typography } from "@mui/joy";
import React from "react";
import MobileShareholders from "./MobileShareholders";

const MobileContent = ({ selectedContent }) => {
  const content = {
    Osakasluettelo: <MobileShareholders />,
  };

  return (
    <Box>
      <Box
        sx={{
          padding: 2,
          mt: 7,
          borderBottom: "solid 1px #ED6930",
        }}
      >
        <Typography level="h4" sx={{ color: "#ED6930" }}>
          {selectedContent}
        </Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        {content[selectedContent] || (
          <Typography>{selectedContent} content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MobileContent;
