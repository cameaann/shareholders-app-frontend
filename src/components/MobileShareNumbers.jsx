import { Box, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import ShareNumbersCard from "./ShareNumbersCard";
import { getShares } from "../services/sharesService";
import { ShareholdersContext } from "./ShareholdersProvider";

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

const MobileShareNumbers = ({ sharesTotalQuantity, searchValue }) => {
  const [shareNumbersList, setShareNumbersList] = useState(initialData);
  const { shareholdersList } = useContext(ShareholdersContext);

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

  const filteredShares = shareNumbersList.filter((share) => {
    const shareholder = shareholdersList?.find(
      (s) => s.id === share.shareholderId
    ) || { name: "" };

    return (
      shareholder.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      share.startNumber.toString().includes(searchValue) ||
      share.endNumber.toString().includes(searchValue)
    );
  });

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
      {filteredShares.map((value, index) => (
        <ShareNumbersCard key={index} value={value} />
      ))}
    </Box>
  );
};

export default MobileShareNumbers;
