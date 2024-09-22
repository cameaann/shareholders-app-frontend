import { TableCell, TableHead, TableRow } from "@mui/material";
import TableHeader from "./TableHeader";
import { Table, Box, Typography } from "@mui/joy";
import { useContext } from "react";
import { ShareholdersContext } from "./ShareholdersProvider";

const ShareNumbersTable = ({ sharenumbers, sharesTotalQuantity }) => {
  let checkSum = sharesTotalQuantity;
  const shareholdersList = useContext(ShareholdersContext);

  const getTotalAmount = () => {
    let total = 0;

    sharenumbers.forEach((e) => {
      total += e.endNumber - e.startNumber + 1;
    });

    return total;
  };

  if (checkSum > 0) {
    checkSum = checkSum - getTotalAmount();
  }

  return (
    <Box>
      <TableHeader />
      <Box>
        <Table
          aria-label="share numbers table"
          hoverRow
          variant="plain"
          sx={{ mt: 4 }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <span>Osakenumerot</span>
                <br />
                <Typography fontSize="smaller">Alkaen</Typography>
              </TableCell>
              <TableCell>
                <span>Osakenumerot</span>
                <br />
                <Typography fontSize="smaller">Päättyen</Typography>
              </TableCell>
              <TableCell>Kpl</TableCell>
              <TableCell>Omistaja</TableCell>
              <TableCell>
                <span>Tarkistuslaskenta</span>
                <br />
                <Typography fontSize="smaller">Osakaiden määrä</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {sharenumbers.map((share, i) => {
              const shareholder = shareholdersList
                ? shareholdersList.find((s) => s.id === share.shareholderId)
                : { name: "" };
              return (
                <TableRow key={i}>
                  <TableCell>{share.startNumber}</TableCell>
                  <TableCell>{share.endNumber}</TableCell>
                  <TableCell>{share.quantity}</TableCell>
                  <TableCell>{shareholder.name}</TableCell>
                  <TableCell>
                    {share.endNumber - share.startNumber + 1}
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography sx={{ gridColumn: "1 / 3", fontWeight: "bold" }}>
            Yhteensä
          </Typography>
          <Typography sx={{ gridColumn: "3 / 4" }}>
            {getTotalAmount()}
          </Typography>
          <Typography sx={{ gridColumn: "1 / 3", fontWeight: "bold" }}>
            Tarkistussumma
          </Typography>
          <Typography sx={{ gridColumn: "3 / 4" }}>{checkSum}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShareNumbersTable;
