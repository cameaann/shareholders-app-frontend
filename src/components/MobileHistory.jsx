import React from "react";
import { Box } from "@mui/joy";
import HistoryCard from "./HistoryCard";
import { useEffect, useState, useContext } from "react";
import { TransferHistoryContext } from "./TransferHistoryProvider";


const MobileHistory = ({ filterId }) => {
  const { historyList } = useContext(TransferHistoryContext);
  const [filteredHistoryList, setFilteredHistoryList] = useState([]);

  useEffect(() => {
    if (filterId !== undefined) {
      const filteredList = historyList.filter(
        (item) =>
          item.fromShareholderId === parseInt(filterId) ||
          item.toShareholderId == parseInt(filterId)
      );
      setFilteredHistoryList(filteredList);
    } else {
      setFilteredHistoryList(historyList);
    }
  }, [filterId, historyList]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {filteredHistoryList.map((item) => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default MobileHistory;
