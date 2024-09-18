import { Box, Typography } from "@mui/joy";
import MobileShareholders from "./MobileShareholders";
import MobileShareNumbers from "./MobileShareNumbers";
import { useState, useEffect } from "react";
import { getTotalSharesQuantity } from "../services/sharesService";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";

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
        {content[maskedTitle] || (
          <Typography>{selectedContent} content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MobileContent;
