import React, { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

const CustomTabs = () => {
  const tabs = [
    "Osakasluettelo",
    "Osakenumerot",
    "Historia",
    "Lisää uusi omistaja",
    "Osakkeen siirto"
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  return (
    <Tabs
      aria-label="Basic tabs"
      value={selectedTab}
      onChange={handleTabChange}
      sx={{
        backgroundColor: "white",
      }}
    >
      <TabList
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "row",
          justifyContent: "flex-end",
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
              backgroundColor: selectedTab === index ? "#FFF" : "#F2F2F2",
            }}
          >
            {value}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default CustomTabs;
