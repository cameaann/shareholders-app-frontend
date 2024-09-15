import React, { useEffect, useState } from "react";
import ShareholdersCard from "./ShareholdersCard";
import { Box } from "@mui/joy";
import { getShareholders } from "../services/shareholdersService";

const initialData = [
  { id: "bhsd5", name: "Alex" },
  { id: "bhso9", name: "Kristofer" },
  { id: "jj2o9", name: "Alexander" },
];

const MobileShareholders = () => {
  const [shareholdersList, setShareholders] = useState(initialData);
  const [totalShares, setTotalShares] = useState(0);

  useEffect(() => {
    let sum = shareholdersList.reduce((acc, person) => {
      console.log("Person's total shares", person.totalShares);
      return acc + person.totalShares;
    }, 0);
    setTotalShares(sum);
  }, [totalShares, shareholdersList]);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {shareholdersList.map((shareholder, index) => {
        let ownship = 0;
        if (totalShares) {
          ownship = `${((shareholder.totalShares / totalShares) * 100).toFixed(
            4
          )}%`;
        }
        return <ShareholdersCard key={index} shareholder={shareholder} ownship={ownship} />;
      })}
    </Box>
  );
};

export default MobileShareholders;
