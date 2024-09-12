import { useState, useEffect } from "react";
import ShareNumbersTable from "./ShareNumbersTable";
import { getShares } from "../services/sharesService";

const initialData = [
  {
    id: 1,
    quantity: 1000,
    startNumber: 1,
    endNumber: 1000,
    shareholderId: 1,
  },
  {
    id: 2,
    quantity: 1000,
    startNumber: 1001,
    endNumber: 2000,
    shareholderId: 2,
  },
];

const Sharenumbers = ({sharesTotalQuantity}) => {
  const [shareNumbers, setShareNumbers] = useState(initialData);

  useEffect(() => {
    getShares()
      .then((res) => {
        if (Array.isArray(res)) {
          setShareNumbers(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <ShareNumbersTable sharenumbers={shareNumbers}  sharesTotalQuantity={sharesTotalQuantity}/>
    </div>
  );
};

export default Sharenumbers;
