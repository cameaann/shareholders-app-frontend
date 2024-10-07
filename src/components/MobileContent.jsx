import { Box, Typography, Input } from "@mui/joy";
import MobileShareholders from "./MobileShareholders";
import MobileShareNumbers from "./MobileShareNumbers";
import { useContext } from "react";
import { SharesQuantityContext } from "./SharesQuantityProvider";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import ShareTransferForm from "./ShareTransferForm";
import { ShareholdersContext } from "./ShareholdersProvider";
import MobileHistory from "./MobileHistory";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

const MobileContent = ({ selectedContent }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const { sharesTotalQuantity, setSharesTotalQuantity } = useContext(
    SharesQuantityContext
  );
  const { shareholdersList } = useContext(ShareholdersContext);

  const handleAddingMainShareholder = (res) => {
    if (res) {
      setSharesTotalQuantity(res);
    }
  };

  const filteredShareholders = shareholdersList.filter((person) => {
    return (
      person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      person.personalIdOrCompanyId
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      person.placeOfResidenceOrHeadquarters
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      person.emailAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
      person.phoneNumber.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  let maskedTitle = selectedContent;
  if (selectedContent === "Lisää uusi omistaja") {
    maskedTitle = "AddShareholder";
  } else if (selectedContent === "Osakkeen siirto") {
    maskedTitle = "ShareTransfer";
  }

  const content = {
    Osakasluettelo: (
      <MobileShareholders shareholdersList={filteredShareholders} />
    ),
    Osakenumerot: (
      <MobileShareNumbers sharesTotalQuantity={sharesTotalQuantity}
      searchValue={searchValue} />
    ),
    AddShareholder: (
      <CreateOrEditShareholderForm
        sharesTotalQuantity={sharesTotalQuantity}
        onAddingMainShareholder={handleAddingMainShareholder}
      />
    ),
    ShareTransfer: <ShareTransferForm />,
    Historia: <MobileHistory searchValue={searchValue}/>,
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
      <Box sx={{ padding: 2, pt: 10, mt: 10 }}>
        <Input
          placeholder="search"
          startDecorator={<FaMagnifyingGlass />}
          size="sm"
          value={searchValue}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
        {content[maskedTitle] || (
          <Typography>{selectedContent} content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MobileContent;
