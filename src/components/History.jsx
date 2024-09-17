import { Box } from "@mui/joy";
import { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";
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

const History = ({ filterId }) => {
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
