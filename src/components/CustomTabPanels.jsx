import React from "react";
import TabPanel from "@mui/joy/TabPanel";
import SharesTable from "./SharesTable";
import ShareNumbersTable from "./ShareNumbersTable";

const CustomTabPanels = () => {
  const tabPanelStyle = {
    border: "solid #ED6930 2px",
  };

  return (
    <>
      <TabPanel value={0} sx={tabPanelStyle}>
        <SharesTable />
      </TabPanel>
      <TabPanel value={1} sx={tabPanelStyle}>
        <ShareNumbersTable/>
      </TabPanel>
    </>
  );
};

export default CustomTabPanels;
