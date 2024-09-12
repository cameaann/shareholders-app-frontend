import { Box } from "@mui/joy";
import { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";


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

const Shareholders = () => {
  const [historyList, sethistoryList] = useState(initialData);

  useEffect(() => {
    // TODO
  }, []);

  return (
    <Box>
      <HistoryTable historyList={historyList}/>
    </Box>
  );
};

export default Shareholders;
