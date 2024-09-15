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
        note: ""
    }
];

const History = () => {

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
    <Box>
      <HistoryTable historyList={historyList}/>
    </Box>
  );
};

export default History;
