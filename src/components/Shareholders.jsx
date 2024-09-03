import { useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";
import SharesTable from "./SharesTable";

const initialData = [
  { id: "bhsd5", name: "Alex" },
  { id: "bhso9", name: "Kristofer" },
  { id: "jj2o9", name: "Alexander" },
];
const Shareholders = () => {
  const [shareholdersList, setShareholders] = useState(initialData);

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
    <div>
      <SharesTable shareholders={shareholdersList} />
    </div>
  );
};

export default Shareholders;
