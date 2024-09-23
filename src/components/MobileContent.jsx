import { Box, Typography } from "@mui/joy";
import MobileShareholders from "./MobileShareholders";
import MobileShareNumbers from "./MobileShareNumbers";
import { useContext } from "react";
import { SharesQuantityContext } from "./SharesQuantityProvider";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import ShareTransferForm from "./ShareTransferForm";
import { ShareholdersContext } from "./ShareholdersProvider";
import MobileHistory from "./MobileHistory";

const MobileContent = ({ selectedContent }) => {
  const { sharesTotalQuantity, setSharesTotalQuantity } = useContext(SharesQuantityContext);
  const { shareholdersList, setShareholders} = useContext(ShareholdersContext);

  const handleAddingMainShareholder = (res) =>{
    if(res){
      setSharesTotalQuantity(res)
    }
  }

  const handleOnChange = (res) => {
    setShareholders(res)
  }

  let maskedTitle = selectedContent;
  if (selectedContent === "Lisää uusi omistaja") {
    maskedTitle = "AddShareholder";
  } else if (selectedContent === "Osakkeen siirto") {
    maskedTitle = "ShareTransfer";
  }

  const content = {
    Osakasluettelo: <MobileShareholders shareholdersList = {shareholdersList} />,
    Osakenumerot: (
      <MobileShareNumbers sharesTotalQuantity={sharesTotalQuantity} />
    ),
    AddShareholder: (
      <CreateOrEditShareholderForm
        sharesTotalQuantity = { sharesTotalQuantity} onAddingMainShareholder={handleAddingMainShareholder} onChange = {handleOnChange}
      />
    ),
    ShareTransfer: <ShareTransferForm />,
    Historia: <MobileHistory />,
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
