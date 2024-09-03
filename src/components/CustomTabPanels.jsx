import React from "react";
import TabPanel from "@mui/joy/TabPanel";
import SharesTable from "./SharesTable";
import ShareNumbersTable from "./ShareNumbersTable";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import Shareholders from "./Shareholders";
import ShareTransferForm from "./ShareTransferForm";
import Sharenumbers from "./Sharenumbers";

const CustomTabPanels = () => {
  const tabPanelStyle = {
    border: "solid #ED6930 2px",
  };

  return (
    <>
      <TabPanel value={0} sx={tabPanelStyle}>
        <Shareholders />
      </TabPanel>
      <TabPanel value={1} sx={tabPanelStyle}>
        <Sharenumbers />
      </TabPanel>
      <TabPanel value={2} sx={tabPanelStyle}>
        History
      </TabPanel>
      <TabPanel value={3} sx={tabPanelStyle}>
        <CreateOrEditShareholderForm />
      </TabPanel>
      <TabPanel value={4} sx={tabPanelStyle}>
        <ShareTransferForm />
      </TabPanel>
    </>
  );
};

export default CustomTabPanels;
