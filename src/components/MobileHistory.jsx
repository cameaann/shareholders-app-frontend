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

const MobileHistory = () => {
  const [historyList, setHistoryList] = useState(initialData);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {historyList.map((item) => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default MobileHistory;
