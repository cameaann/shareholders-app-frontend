import { Box } from "@mui/joy";
import { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";
import { getHistoryTransferNotes } from "../services/historyTransferService";

const initialData = [
  {
    settelmentDay: "16.5.2023",
    paymentDate: "25.6.2023",
    transferor: 9,
    reciver: 1,
    transferTax: null,
    quantity: 35,
    pricePerShare: 0.135,
    eur: 4.73,
    note: "",
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
        (item) => item.fromShareholderId === parseInt(filterId)
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
