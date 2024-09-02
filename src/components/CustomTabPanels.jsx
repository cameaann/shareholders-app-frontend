import React from "react";
import TabPanel from "@mui/joy/TabPanel";
import SharesTable from "./SharesTable";
import ShareNumbersTable from "./ShareNumbersTable";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import Shareholders from "./Shareholders";

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
        <ShareNumbersTable/>
      </TabPanel>
      <TabPanel value={3} sx={tabPanelStyle}>
        <CreateOrEditShareholderForm/>
      </TabPanel>
    </>
  );
};

export default CustomTabPanels;
