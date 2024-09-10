import axios from "axios";

const sharesUrl = "http://localhost:8080/api/shares";
const transfeUrl = "http://localhost:8080/api/shares/transfer";

const getShares = async () => {
  const res = await axios.get(sharesUrl);
  return res.data;
};

const makeTransfer = async (formData) => {
  const payload = {
    fromShareholderId: formData.fromShareholderId,
    toShareholderId: formData.toShareholderId,
    quantity: formData.quantity,
    pricePerShare: formData.pricePerShare,
    transferDate: formData.saantoDay,
    transferTax: formData.transferTax,
  };

  try {
    const response = await axios.post(transfeUrl, payload, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      alert("Transfer made successfully!");
      return true;
      // Optionally, clear form here
    } else {
      alert("Failed to make transfer");
    }
  } catch (error) {
    console.error("Error making the transfer:", error);
    alert("An error occurred while making transfer");
    return false;
  }

};

export { getShares, makeTransfer };
