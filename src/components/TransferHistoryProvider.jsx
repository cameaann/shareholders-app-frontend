import { createContext, useState, useEffect } from "react";
import { getHistoryTransferNotes } from "../services/historyTransferService";

export const TransferHistoryContext = createContext();
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

export const TransferHistoryProvider = ({ children }) => {
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
  }, [])

  const updateHistoryList = (updatedHistoryNote) => {
    setHistoryList((prevState) =>
        prevState.map((historyNote) =>
          historyNote.id === updatedHistoryNote.id ? updatedHistoryNote : historyNote
        )
      );
  }

  return (
    <TransferHistoryContext.Provider value={{historyList, setHistoryList, updateHistoryList }}>
      {children}
    </TransferHistoryContext.Provider>
  );
};
