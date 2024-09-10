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
      {shareholdersList.map((shareholder, index) => (
        <ShareholdersCard key={index} shareholder={shareholder} />
      ))}
    </Box>
  );
};

export default MobileShareholders;
