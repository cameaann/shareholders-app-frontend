import TableHeader from "./TableHeader";
import { Table, Box, Typography } from "@mui/joy";

const ShareNumbersTable = ({ sharenumbers }) => {
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
        <Table aria-label="share numbers table" hoverRow variant="plain">
          <thead>
            <tr>
              <th>
                <span>Osakenumerot</span>
                <br />
                <Typography fontSize="smaller">Alkaen</Typography>
              </th>
              <th>
                <span>Osakenumerot</span>
                <br />
                <Typography fontSize="smaller">Päättyen</Typography>
              </th>
              <th>Kpl</th>
              <th>Omistaja</th>
              <th>
                <span>Tarkistuslaskenta</span>
                <br />
                <Typography fontSize="smaller">Osakaiden määrä</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {sharenumbers.map((share, i) => (
              <tr key={i}>
                <td>{share.startNumber}</td>
                <td>{share.endNumber}</td>
                <td>{share.quantity}</td>
                <td>{share.shareholderId}</td>
                <td>{share.endNumber-share.startNumber + 1}</td>
              </tr>
            ))}
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
          <Typography sx={{ gridColumn: "3 / 4" }}>0</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShareNumbersTable;
