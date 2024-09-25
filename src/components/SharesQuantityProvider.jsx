import { createContext, useState, useEffect } from "react";
import { getTotalSharesQuantity } from "../services/sharesService";
export const SharesQuantityContext = createContext();

export const SharesQuantityProvider = ({ children }) => {
  const [sharesTotalQuantity, setSharesTotalQuantity] = useState();

  useEffect(() => {
    getTotalSharesQuantity()
      .then((res) => {
        setSharesTotalQuantity(res.totalShares);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SharesQuantityContext.Provider value={{sharesTotalQuantity, setSharesTotalQuantity }}>
      {children}
    </SharesQuantityContext.Provider>
  );
};
