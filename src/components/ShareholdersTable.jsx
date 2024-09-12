import TableHeader from "./TableHeader";
import { Table, IconButton, Box } from "@mui/joy";
import { FaEdit } from "react-icons/fa";
import { TableCell, TableRow, TableHead } from "@mui/material";

const handleEditOnClick = () => {
  // we need endpoint for changing the data?
  alert("Edit button clicked");
};

const ShareholdersTable = ({ shareholders }) => {
  const rows = shareholders.map((person, index) => {
    return (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{person.totalShares}</TableCell>
        <TableCell>{person.name}</TableCell>
        <TableCell>{person.ownershipPercentage}</TableCell>
        <TableCell>{person.personalIdOrCompanyId}</TableCell>
        <TableCell>{person.placeOfResidenceOrHeadquarters}</TableCell>
        <TableCell>{person.address}</TableCell>
        <TableCell>{person.emailAddress}</TableCell>
        <TableCell>{person.phoneNumber}</TableCell>
        <TableCell>
          <IconButton onClick={handleEditOnClick}>
            <FaEdit size={20} />
          </IconButton>
          {/* 
          <IconButton>
            <FaTrashCan size={20} />
          </IconButton> */}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Box>
      <TableHeader />
      <Box>
        <Table
          aria-label="shares table"
          hoverRow
          variant="plain"
          sx={{ mt: 4 }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "60px" }}>Osakas</TableCell>
              <TableCell>Määrä</TableCell>
              <TableCell>Nimi</TableCell>
              <TableCell>Omistus %</TableCell>
              <TableCell>Hetu / Y-tunn.</TableCell>
              <TableCell>Kotipaikka</TableCell>
              <TableCell>Postiosoite</TableCell>
              <TableCell sx={{ width: "200px" }}>Sähköposti</TableCell>
              <TableCell sx={{ width: "150px" }}>Puhelinnumero</TableCell>
              <TableCell sx={{ width: "50px" }}>Toiminnot</TableCell>
            </TableRow>
          </TableHead>
          <tbody>{shareholders.length > 0 ? rows : <div></div>}</tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ShareholdersTable;
