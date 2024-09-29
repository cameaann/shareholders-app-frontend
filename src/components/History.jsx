import { Box } from "@mui/joy";
import { useState, useEffect, useContext } from "react";
import HistoryTable from "./HistoryTable";
import { TransferHistoryContext } from "./TransferHistoryProvider";



const History = ({ filterId }) => {
  const { historyList } = useContext(TransferHistoryContext);
  const [filteredHistoryList, setFilteredHistoryList] = useState([]);


  useEffect(() => {
    if (filterId !== undefined) {
      const filteredList = historyList.filter(
        (item) => item.fromShareholderId === parseInt(filterId) || item.toShareholderId == parseInt(filterId)
      );
      setFilteredHistoryList(filteredList);
    } else {
      setFilteredHistoryList(historyList);
    }
  }, [filterId, historyList]);

  return (
    <Box>
      <HistoryTable historyList={filteredHistoryList} />
    </Box>
  );
};

export default History;
