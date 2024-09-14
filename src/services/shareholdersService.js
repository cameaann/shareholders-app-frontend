import axios from "axios";

const devUrl = "http://localhost:8080/health";
const shareHoldersUrl = "http://localhost:8080/api/shareholders";

const getStatus = async () => {
  const res = await axios.get(devUrl);
  return res.data;
};

const getShareholders = async () => {
  const res = await axios.get(shareHoldersUrl);
  return res.data;
};

const saveShareholder = async (formData) => {

  const payload = {
    shareholder : {
      name: formData.name,
      personalIdOrCompanyId: formData.personalId,
      placeOfResidenceOrHeadquarters: formData.city,
      address: formData.address,
      emailAddress: formData.email,
      phoneNumber: formData.phoneNumber,
      bankAccountNumber: formData.bankAccountNumber,
    },
    shares: formData.quantity
  };

  if(formData.quantity > 0){
    console.log(formData.quantity);
    payload.shares = parseInt(formData.quantity);
  }
  console.log(JSON.stringify(payload));
  try {
    const response = await axios.post(shareHoldersUrl, payload, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      // alert("Shareholder saved successfully!");
      return true;

    } else {
      alert("Failed to save shareholder");
    }
  } catch (error) {
    console.error("Error saving shareholder:", error);
    alert("An error occurred while saving the shareholder");
    return false;
  }
};

export { getShareholders, getStatus, saveShareholder };
