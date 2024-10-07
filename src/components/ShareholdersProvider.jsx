import { createContext, useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";

// Create the Shareholders Context
export const ShareholdersContext = createContext();

const initialData = [
  {
    id: 1,
    name: "John Doe",
    personalIdOrCompanyId: "123456-****",
    placeOfResidenceOrHeadquarters: "Helsinki",
    address: "Main St 1",
    emailAddress: "john.doe@example.com",
    phoneNumber: "(+358) 9 123 4567",
    bankAccountNumber: "FI1212345600000785",
    shares: [],
    totalShares: 0,
    ownershipPercentage: "0",
  },
  { 
    id: 2,
    name: "Alice Smith",
    personalIdOrCompanyId: "987654-****",
    placeOfResidenceOrHeadquarters: "Helsinki",
    address: "Elm St 5",
    emailAddress: "alice.smith@example.com",
    phoneNumber: "(+358) 40 123 4567",
    bankAccountNumber: "FI1212345600000123",
    shares: [
    ],
    totalShares: 0,
    ownershipPercentage: "0"
    }
];

const ShareholdersProvider = ({ children }) => {
  const [shareholdersList, setShareholders] = useState(initialData);

  const addShareholder = (newShareholder) => {
    setShareholders((prevState) => [...prevState, newShareholder]);
  };

  const editShareholder = (updatedShareholder) => {
    setShareholders((prevState) =>
      prevState.map((shareholder) =>
        shareholder.id === updatedShareholder.id
          ? updatedShareholder
          : shareholder
      )
    );
  };

  useEffect(() => {
    getShareholders()
      .then((res) => {
        if (Array.isArray(res)) {
          setShareholders(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ShareholdersContext.Provider
      value={{
        shareholdersList,
        setShareholders,
        addShareholder,
        editShareholder,
      }}
    >
      {children}
    </ShareholdersContext.Provider>
  );
};

export default ShareholdersProvider;
