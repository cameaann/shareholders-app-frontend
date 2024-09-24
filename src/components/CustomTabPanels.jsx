import TabPanel from "@mui/joy/TabPanel";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import Shareholders from "./Shareholders";
import History from "./History";
import ShareTransferForm from "./ShareTransferForm";
import Sharenumbers from "./Sharenumbers";
import { useContext } from "react";
import { SharesQuantityContext } from "./SharesQuantityProvider";
import { ShareholdersContext } from "./ShareholdersProvider";

const CustomTabPanels = () => {
  const tabPanelStyle = {
    border: "solid #ED6930 2px",
  };

  const { sharesTotalQuantity, setSharesTotalQuantity } = useContext(SharesQuantityContext);
  const { shareholdersList } = useContext(ShareholdersContext);

  const handleAddingMainShareholder = (res) =>{
    if(res){
      setSharesTotalQuantity(res)
    }
  }

  return (
    <>
      <TabPanel value={0} sx={tabPanelStyle}>
        <Shareholders shareholdersList = {shareholdersList} />
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
