import React, { useState } from "react";
import ShareNumbersTable from "./ShareNumbersTable";

const initialData = [
    {
      from: 1,
      to: 4,
      holder: 1
    },
    {
      from: 53,
      to: 632,
      holder: 2
    }
];

const Sharenumbers = () => {
  const [shareNumbers, setshareNumbers] = useState(initialData);

  return <div><ShareNumbersTable sharenumbers={shareNumbers}/></div>;
};

export default Sharenumbers;
