import React from "react";
import { Box } from "@mui/joy";
import HistoryCard from "./HistoryCard";
import { useEffect, useState } from "react";
import { getHistoryTransferNotes } from "../services/historyTransferService";

const initialData = [
  {
    id: 1,
    fromShareholderId: 1,
    toShareholderId: 2,
    quantity: 122,
    transferDate: "2024-09-19",
    paymentDate: null,
    transferTax: false,
    pricePerShare: 1,
    additionalNotes: "",
    totalAmount: 122,
  },
];

const MobileHistory = ({ filterId }) => {
  const [historyList, setHistoryList] = useState(initialData);
  const [filteredHistoryList, setFilteredHistoryList] = useState([]);

  useEffect(() => {
    getHistoryTransferNotes()
      .then((res) => {
        if (Array.isArray(res)) {
          setHistoryList(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
