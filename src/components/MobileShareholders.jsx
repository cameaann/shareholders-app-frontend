import { useEffect, useState, useContext } from "react";
import ShareholdersCard from "./ShareholdersCard";
import { Box } from "@mui/joy";
import { ShareholdersContext } from "./ShareholdersProvider";

const MobileShareholders = () => {
const shareholdersList = useContext(ShareholdersContext);
  const [totalShares, setTotalShares] = useState(0);

  useEffect(() => {
    let sum = shareholdersList.reduce((acc, person) => {
      console.log("Person's total shares", person.totalShares);
      return acc + person.totalShares;
    }, 0);
    setTotalShares(sum);
  }, [totalShares, shareholdersList]);


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
