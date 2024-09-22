import { useState } from "react";
import CustomTabs from "./components/CustomTabs";
// import Header from "./components/Header";
import { Box } from "@mui/joy";
import MobileContent from "./components/MobileContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNavbar from "./components/MobileNavbar";

const App = () => {
  const isSmallScreen = useMediaQuery("(max-width: 870px)");

  const [selectedContent, setSelectedContent] = useState("Osakasluettelo");

  const handleMenuSelect = (menuItem) => setSelectedContent(menuItem);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {!isSmallScreen ? (
        <>
          {/* <Header /> */}
          <CustomTabs />
        </>
      ) : (
        <>
          <MobileNavbar onMenuSelect={handleMenuSelect} />
          <MobileContent selectedContent={selectedContent} />
        </>
      )}
    </Box>
  );
};

export default App;
