import { Box, Typography } from "@mui/joy";
import MobileShareholders from "./MobileShareholders";
import MobileShareNumbers from "./MobileShareNumbers";
import { useState, useEffect } from "react";
import { getTotalSharesQuantity } from "../services/sharesService";

const MobileContent = ({ selectedContent }) => {
  const [sharesTotalQuantity, setSharesTotalQuantity] = useState();
  const content = {
    Osakasluettelo: <MobileShareholders />,
    Osakenumerot: (
      <MobileShareNumbers sharesTotalQuantity={sharesTotalQuantity} />
    ),
  };

  useEffect(() => {
    getTotalSharesQuantity()
      .then((res) => {
        setSharesTotalQuantity(res.totalShares);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
