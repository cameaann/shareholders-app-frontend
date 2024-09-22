import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import CustomTabPanels from "./CustomTabPanels";

const CustomTabs = () => {
  const tabs = [
    "Osakasluettelo",
    "Osakenumerot",
    "Historia",
    "Lisää uusi omistaja",
    "Osakkeen siirto",
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event, newValue) => setSelectedTab(newValue);

  return (
    <Tabs
      aria-label="Basic tabs"
      value={selectedTab}
      onChange={handleTabChange}
      sx={{
        backgroundColor: "white",
        flexGrow: "1",
        padding: "0rem 1rem 1rem 1rem",
      }}
    >
      <TabList
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
        disableUnderline
      >
        {tabs.map((value, index) => (
          <Tab
            key={index}
            disableIndicator
            sx={{
              border: `2px solid ${
                selectedTab === index ? "#ED6930" : "#DBDBDB"
              }`,
              borderBottom: "none",
              borderRadius: "5px 5px 0 0",
              backgroundColor: "#F2F2F2",
              transition: "transform 100ms",
              transform: selectedTab === index ? "translateY(6%)" : ""
            }}
          >
            {value}
          </Tab>
        ))}
      </TabList>
      <CustomTabPanels />
    </Tabs>
  );
};

export default CustomTabs;
