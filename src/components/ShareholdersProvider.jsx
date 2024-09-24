import { createContext, useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";

// Create the Shareholders Context
export const ShareholdersContext = createContext();

const initialData = [
  { id: "bhsd5", name: "Alex" },
  { id: "bhso9", name: "Kristofer" },
  { id: "jj2o9", name: "Alexander" },
];

const ShareholdersProvider = ({ children }) => {
  const [shareholdersList, setShareholders] = useState(initialData);

  const addShareholder = (newShareholder) => {
    setShareholders((prevState) => [...prevState, newShareholder]);
  };  

  const editShareholder = (updatedShareholder) => {
    setShareholders((prevState) =>
      prevState.map((shareholder) =>
        shareholder.id === updatedShareholder.id ? updatedShareholder : shareholder
      )
    );
  };
  const updateShareholder = (seller, buyer) => {
    setShareholders((prevState) =>
      prevState.map((shareholder) =>
        (shareholder.id === seller.id ? seller : shareholder) && 
        (shareholder.id === buyer.id ? buyer : shareholder)
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
    <ShareholdersContext.Provider value={{ shareholdersList, setShareholders, addShareholder, editShareholder, updateShareholder}}>
      {children}
    </ShareholdersContext.Provider>
  );
};

export default ShareholdersProvider;
