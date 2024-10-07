import React from "react";
import { Box } from "@mui/joy";
import HistoryCard from "./HistoryCard";
import { useEffect, useState, useContext } from "react";
import { TransferHistoryContext } from "./TransferHistoryProvider";
import { ShareholdersContext } from "./ShareholdersProvider";

const MobileHistory = ({ filterId, searchValue }) => {
  const { historyList } = useContext(TransferHistoryContext);
  const [filteredHistoryList, setFilteredHistoryList] = useState([]);
  const { shareholdersList } = useContext(ShareholdersContext);
  useEffect(() => {
    let filteredList = historyList;

    if (filterId !== undefined) {
      filteredList = historyList.filter(
        (item) =>
          item.fromShareholderId === parseInt(filterId) ||
          item.toShareholderId === parseInt(filterId)
      );
    }

    if (searchValue) {
      filteredList = filteredList.filter((note) => {
        const seller =
          shareholdersList
            ?.find((s) => s.id === note.fromShareholderId)
            ?.name.toLowerCase() || "";
        const buyer =
          shareholdersList
            ?.find((s) => s.id === note.toShareholderId)
            ?.name.toLowerCase() || "";

        return (
          seller.includes(searchValue.toLowerCase()) ||
          buyer.includes(searchValue.toLowerCase()) ||
          note.transferDate.includes(searchValue) ||
          note.pricePerShare.toString().includes(searchValue)
        );
      });
    }

    setFilteredHistoryList(filteredList);
  }, [filterId, historyList, searchValue]);

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
