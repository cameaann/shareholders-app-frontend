import { Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import ShareNumbersCard from "./ShareNumbersCard";
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

const MobileShareNumbers = ({ sharesTotalQuantity}) => {
  const [shareNumbersList, setShareNumbersList] = useState(initialData);

  const getTotalAmount = () => {
    let total = 0;

    shareNumbersList.forEach((e) => (total += e.endNumber - e.startNumber + 1));

    return total;
  };

  useEffect(() => {
    getShares()
      .then((res) => {
        if (Array.isArray(res)) {
          setShareNumbersList(res);
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
      <Box>
        <Typography fontWeight={"bold"}>
          Yhteensä:{" "}
          <Typography fontWeight={"normal"}>{getTotalAmount()}</Typography>
        </Typography>
      </Box>
      {shareNumbersList.map((value, index) => (
        <ShareNumbersCard key={index} value={value} />
      ))}
    </Box>
  );
};

export default MobileShareNumbers;
