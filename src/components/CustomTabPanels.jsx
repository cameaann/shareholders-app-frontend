import TabPanel from "@mui/joy/TabPanel";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import Shareholders from "./Shareholders";
import History from "./History";
import ShareTransferForm from "./ShareTransferForm";
import Sharenumbers from "./Sharenumbers";
import { useState, useEffect } from "react";
import { getTotalSharesQuantity } from "../services/sharesService";

const CustomTabPanels = () => {
  const tabPanelStyle = {
    border: "solid #ED6930 2px",
  };

  const [sharesTotalQuantity, setSharesTotalQuantity] = useState();

  useEffect(() => {
   getTotalShares()
  });

  const handleAddingMainShareholder = (res) =>{
    if(res){
      getTotalShares();
    }
  }

  async function getTotalShares (){
    getTotalSharesQuantity()
    .then((res) => {
        setSharesTotalQuantity(res.totalShares);
      console.log(sharesTotalQuantity);
    })
    .catch(() => {
      setSharesTotalQuantity(0);
    });
  }

  return (
    <>
      <TabPanel value={0} sx={tabPanelStyle}>
        <Shareholders />
      </TabPanel>
      <TabPanel value={1} sx={tabPanelStyle}>
        <Sharenumbers sharesTotalQuantity = { sharesTotalQuantity} />
      </TabPanel>
      <TabPanel value={2} sx={tabPanelStyle}>
        <History />
      </TabPanel>
      <TabPanel value={3} sx={tabPanelStyle}>
        <CreateOrEditShareholderForm sharesTotalQuantity = { sharesTotalQuantity} onAddingMainShareholder={handleAddingMainShareholder}/>
      </TabPanel>
      <TabPanel value={4} sx={tabPanelStyle}>
        <ShareTransferForm />
      </TabPanel>
    </>
  );
};

export default CustomTabPanels;
