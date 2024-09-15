import axios from "axios";

const historyTransferUrl = "http://localhost:8080/api/transfer-history";

const getHistoryTransferNotes = async () => {
  const res = await axios.get(historyTransferUrl);
  return res.data;
};

export { getHistoryTransferNotes };
