import { Box, Typography } from "@mui/joy";
import MobileShareholders from "./MobileShareholders";
import MobileShareNumbers from "./MobileShareNumbers";
import { useState, useEffect } from "react";
import { getTotalSharesQuantity } from "../services/sharesService";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import ShareTransferForm from "./ShareTransferForm";

const MobileContent = ({ selectedContent }) => {
  const [sharesTotalQuantity, setSharesTotalQuantity] = useState();

  useEffect(() => {
    getTotalShares();
  });

  const handleAddingMainShareholder = (res) => {
    if (res) {
      getTotalShares();
    }
  };

  async function getTotalShares() {
    getTotalSharesQuantity()
      .then((res) => {
        setSharesTotalQuantity(res.totalShares);
      })
      .catch(() => {
        setSharesTotalQuantity(0);
      });
  }

  let maskedTitle = selectedContent;
  if (selectedContent === "Lisää uusi omistaja") {
    maskedTitle = "AddShareholder";
  } else if (selectedContent === "Osakkeen siirto") {
    maskedTitle = "ShareTransfer";
  }

  const content = {
    Osakasluettelo: <MobileShareholders />,
    Osakenumerot: (
      <MobileShareNumbers sharesTotalQuantity={sharesTotalQuantity} />
    ),
    AddShareholder: (
      <CreateOrEditShareholderForm
        sharesTotalQuantity={sharesTotalQuantity}
        onAddingMainShareholder={handleAddingMainShareholder}
      />
    ),
    ShareTransfer: <ShareTransferForm />,
  };

  return (
    <Box>
      <Box
        sx={{
          padding: 2,
          paddingBlockStart: 10,
          borderBottom: "solid 1px #ED6930",
          position: "fixed",
          zIndex: 60,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Typography level="h4" sx={{ color: "#ED6930" }}>
          {selectedContent}
        </Typography>
      </Box>
      <Box sx={{ padding: 2, pt: 10, mt: 10, }}>
        {content[maskedTitle] || (
          <Typography>{selectedContent} content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MobileContent;
