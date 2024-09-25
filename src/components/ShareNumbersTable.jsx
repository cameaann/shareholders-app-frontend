import { TableCell, TableHead, TableRow } from "@mui/material";
import TableHeader from "./TableHeader";
import { Table, Box, Typography } from "@mui/joy";
import { useContext } from "react";
import { ShareholdersContext } from "./ShareholdersProvider";

const ShareNumbersTable = ({ sharenumbers, sharesTotalQuantity }) => {
  const { shareholdersList } = useContext(ShareholdersContext);

  const getTotalAmount = () => {
    let total = 0;

    sharenumbers.forEach((e) => {
      total += e.endNumber - e.startNumber + 1;
    });

    return total;
  };

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
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(96, 96, 96)",
                  // textAlign:"center"
                },
              }}
            >
              <TableCell align="center">
                Osakenumerot
                <Typography fontSize="smaller">Alkaen</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize="smaller">Päättyen</Typography>
              </TableCell>
              <TableCell align="center">Kpl</TableCell>
              <TableCell align="center">Omistaja</TableCell>
              <TableCell>
                Tarkistuslaskenta
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
                  <TableCell align="right">{share.startNumber}</TableCell>
                  <TableCell align="right">{share.endNumber}</TableCell>
                  <TableCell align="right">{share.quantity}</TableCell>
                  <TableCell align="center">
                    {shareholder ? shareholder.name : share.id}
                  </TableCell>
                  <TableCell align="right">
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
          <Typography sx={{ fontWeight: "bold" }}>
            Yhteensä
          </Typography>
          <Typography>
            {getTotalAmount()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShareNumbersTable;
