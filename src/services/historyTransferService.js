import axios from "axios";
import { toast } from "react-toastify";

const historyTransferUrl = "http://localhost:8080/api/transfer-history";
const paymentDateUrl = "http://localhost:8080/api/transfer-history/";

const getHistoryTransferNotes = async () => {
  const res = await axios.get(historyTransferUrl);
  return res.data;
};

const setPaymentDate = async (id, paymentDate) => {

  const payload = {
    paymentDate: paymentDate
  }
  console.log(JSON.stringify(payload));
  try {
    const res = await axios.put(`${paymentDateUrl}${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      toast("Payment date saved!");
      return res.data;
    } else {
      toast("Failed to save payment date");
    }
  } catch (error) {
    console.error("Error saving shareholder:", error);
    toast("An error occurred while saving the payment date");
    return false;
  }
};

export { getHistoryTransferNotes, setPaymentDate };
