import axios from "axios";
import { toast } from "react-toastify";

const sharesUrl = "http://localhost:8080/api/shares";
const transferUrl = "http://localhost:8080/api/shares/transfer";
const metaUrl = "http://localhost:8080/api/metadata";

const getShares = async () => {
  const res = await axios.get(sharesUrl);
  return res.data;
};

const addShares = async (person, shares) => {
  const payload = {
    shareholder: {
      id: person.id,
      name: person.name,
      placeOfResidenceOrHeadquarters: person.city,
      address: person.address,
      emailAddress: person.email,
      phoneNumber: person.phoneNumber,
      bankAccountNumber: person.bankAccountNumber,
    },
    shares: shares,
  };
  try {
    const res = await axios.post(`${sharesUrl}`, payload, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


const getTotalSharesQuantity = async () => {
  const res = await axios.get(metaUrl);
  return res.data;
}

const makeTransfer = async (formData) => {
  const payload = {
    fromShareholderId: formData.fromShareholderId,
    toShareholderId: formData.toShareholderId,
    quantity: formData.quantity,
    pricePerShare: formData.pricePerShare,
    transferDate: formData.saantoDay,
    transferTax: formData.transferTax,
    additionalNotes: formData.notes
  };

  try {
    const response = await axios.post(transferUrl, payload, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      toast.success("Transfer made successfully!");
      return response.data;

    } else {
      toast.error(response.data);
    }
  } catch (error) {
    if (error.status === 400) {
      toast.error("Error making the transfer: " + error.response.data);
    }

    return false;
  }

};

export { getShares, addShares, makeTransfer, getTotalSharesQuantity };
