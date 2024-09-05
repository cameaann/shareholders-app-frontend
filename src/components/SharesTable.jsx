import React from "react";
import TableHeader from "./TableHeader";
import { Table, IconButton, Box } from "@mui/joy";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const handleEditOnClick = () => {
  // we need endpoint for changing the data?
  alert("Edit button clicked");
};

const SharesTable = ({ shareholders }) => {
  const rows = shareholders.map((person, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{person.totalShares}</td>
        <td>{person.name}</td>
        <td>{person.ownershipPercentage}</td>
        <td>{person.personalIdOrCompanyId}</td>
        <td>{person.placeOfResidenceOrHeadquarters}</td>
        <td>{person.address}</td>
        <td>{person.emailAddress}</td>
        <td>{person.phoneNumber}</td>
        <td>
          <IconButton onClick={handleEditOnClick}>
            <FaEdit size={20} />
          </IconButton>

          <IconButton>
            <FaTrashCan size={20} />
          </IconButton>
        </td>
      </tr>
    );
  });

  return (
    <Box>
      <TableHeader />
      <Box>
        <Table aria-label="shares table" hoverRow variant="plain">
          <thead>
            <tr>
              <th>Osakas</th>
              <th>Määrä</th>
              <th>Nimi</th>
              <th>Omistus %</th>
              <th>Hetu / Y-tunn.</th>
              <th>Kotipaikka</th>
              <th>Postiosoite</th>
              <th>Sähköposti</th>
              <th>Puhelinnumero</th>
              <th>Toiminnot</th>
            </tr>
          </thead>
          <tbody>{shareholders.length > 0 ? rows : <div></div>}</tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SharesTable;
